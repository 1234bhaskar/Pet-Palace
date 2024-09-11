import { prismaClient } from "../../clients/db";
import {S3Client,PutObjectCommand} from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { CreateProductPayload, GraphqlContext } from "../../interface";
import * as dotenv from 'dotenv';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

import { NeonPostgres } from "@langchain/community/vectorstores/neon";
import { Seller } from ".";

dotenv.config()

type categoriesMaptype = {
    [key: number]: string;
  };

const categoriesMap:categoriesMaptype={
    1:"cat",
    2:"dog",
    3:"toy",
    4:"cloth"
}

// Initialize an embeddings instance
const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey:process.env.GOOGLE_API_KEY,
    model: "text-embedding-004", // 768 dimensions
    taskType: TaskType.RETRIEVAL_DOCUMENT,
    title: "Document title",
});

// Initialize a NeonPostgres instance to store embedding vectors


const s3Client= new S3Client({
    region:process.env.AWS_DEFAULT_REGION,
})

const queries={
    getSignedURLForProduct: async(parent:any,{imageType,imageName}:{imageType:string,imageName:string},ctx:GraphqlContext)=>{
        if(!ctx.user || !ctx.user.id) throw new Error("Unauthenticated");
        const allowedImageTypes=[
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/webp"];
        if(!allowedImageTypes.includes(imageType))
            throw new Error("Unsupported Image Type");

        const putObjectCommand=new PutObjectCommand({
            Bucket:process.env.AWS_S3_BUCKET,
            ContentType:imageType,
            Key:`uploads/${ctx.user.id}/products/${imageName}-${Date.now()}`
        });

        const signedUrl=await getSignedUrl(s3Client,putObjectCommand);
        return signedUrl;
    },
};
 const mutations={
    createProduct: async(_parent:any,{payload}:{payload:CreateProductPayload},ctx:GraphqlContext)=>{ 
        const vectorStore = await NeonPostgres.initialize(embeddings, {
            connectionString: process.env.DATABASE_URL as string,
        });     
          if(!ctx.user?.id) throw new Error("You are not authenticated");
        try{
            const getCategoryName = (categoryId:number) => categoriesMap[categoryId] || "Unknown Category";
            const product=await prismaClient.product.create({
            data:{
                name:payload.name,
                price:payload.price,
                categories: {
                              connect: payload.categoryIds.map(id => ({ id })),  // Connect existing categories by their IDs
                             },
                description:payload.description,
                images:payload.images,
                seller: {
                       connect: { id: ctx.user.id },  // Connect the seller by their ID
                        },  
                 },
                 include:{categories:true}
        })
        const document = {
            pageContent: `${payload.name}`,
            metadata: {
                id: product.id,
                description: payload.description,
                price:payload.price,
                images:payload.images,
                categories:product.categories.map(cat => categoriesMap[cat.id] || "Unknown Category"),
                stock:true,
                createdAt:product.createdAt,
                updatedAt:product.updatedAt,
                sellerId:product.sellerId
            }
        };
        await vectorStore.addDocuments([document]);

            return true;
        }catch(e){
                    console.log("error in resolver",e);
                    throw new Error("You are not authenticated");
            }
    }
}

export const resolvers={mutations,queries}