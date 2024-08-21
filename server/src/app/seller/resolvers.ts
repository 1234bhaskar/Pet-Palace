import { prismaClient } from "../../clients/db";
import {S3Client,PutObjectCommand} from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { CreateProductPayload, GraphqlContext } from "../../interface";
import 'dotenv/config';


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
          if(!ctx.user?.id) throw new Error("You are not authenticated");
        try{

            await prismaClient.product.create({
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
                 }
        })

            return true;
        }catch(e){
                    console.log("error in resolver",e);
                    throw new Error("You are not authenticated");
            }
    }
}

export const resolvers={mutations,queries}