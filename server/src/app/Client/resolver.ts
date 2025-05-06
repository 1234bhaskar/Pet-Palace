import { PrismaClient, Product } from '@prisma/client'
import { Order } from '../Order';
import * as dotenv from 'dotenv';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
// const { LLMChain} = f("langchain");
import { ChatGroq } from "@langchain/groq";



import { OpenAIEmbeddings, } from "@langchain/openai";
import { NeonPostgres } from "@langchain/community/vectorstores/neon";

dotenv.config()

// Initialize an embeddings instance
const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey:process.env.GOOGLE_API_KEY,
    model: "text-embedding-004", // 768 dimensions
    taskType: TaskType.RETRIEVAL_DOCUMENT,
    title: "Document title",
  });
  const llm = new ChatGroq({
    apiKey:process.env.Grok_API_KEY,
    model: "mixtral-8x7b-32768",
    temperature: 0
  });

  
  type Producttype = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    stock: boolean;
    createdAt: Date;
    updatedAt: Date;
    images: string[];
    sellerId: string;
    categories: string[];
}

const prisma = new PrismaClient()


const queries={
    getAllProduct:async(parent:any,args:any)=>{
        const product=await prisma.product.findMany({
            include:{
                categories:true
            }
        });
        if (product) {
            
            const modifiedProducts = product.map((products) => {
                return {
                  ...products,
                  categories: products.categories.map((category) => category.name), 
                };
              });
          
              return modifiedProducts;
        }
        else{
            return null
        }
    },
    getProuctById:async(parent:any,{id}:{id:string})=>{
        console.log(id)
        const product= await prisma.product.findUnique({
            where:{
                id:id
            },
            include:{
                categories:true
            }
        })
        console.log(product);
        
        if (product) {
            
            const categories = product.categories.map(category => category.name);
    
            return {
                ...product,
                categories 
            };
        } 
        else{
            return null
        }
    },
    getAllCategories:async()=>{
        try{
            const categories=await prisma.category.findMany({});
            return categories
        }
        catch(e){
            return e
        }
    },
    getProductsBySearch:async(parent:any,{searchTerm}:{searchTerm:string})=>{
        // let products:Product[]
        if(searchTerm==null){
            let products=await prisma.product.findMany({
                include:{
                    categories:true
                }
            })
            const modifiedProducts = products.map((product) => {
                return {
                  ...product,
                  categories: product.categories.map((category) => category.name), 
                };
              });
            return modifiedProducts
        }
        //! Partial Matching not included in full-text search
        const products=await prisma.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            search: searchTerm, 
                        }
                    },
                    {
                        description: {
                            search: searchTerm,
                        }
                    }
                ]
            },
            include: {
                categories: true,
            }
        });
            
            const modifiedProducts = products.map((product) => {
                return {
                  ...product,
                  categories: product.categories.map((category) => category.name), 
                };
              });
          
            //   console.log(modifiedProducts);
        
        if(searchTerm.length>=3){
            const vectorStore = await NeonPostgres.initialize(embeddings, {
                connectionString: process.env.DATABASE_URL as string,
              });
              
              console.log(vectorStore.toJSON());
    
            try{
                const resultOne = await vectorStore.similaritySearch(searchTerm,4);
                
                const vectorProducts:Producttype[]=resultOne.filter((doc)=>{
                    if(modifiedProducts.some((product)=>product.id===doc.metadata.id)){
                        return false
                    }
                    else{   
                        return true
                    }
                }).map((doc) =>({
                    id: doc.metadata.id as string,
                    name: doc.pageContent as string,
                    description: doc.metadata.description as string|null,
                    price: parseFloat(doc.metadata.price) || 0, 
                    stock: doc.metadata.stock as boolean,
                    categories:doc.metadata.categories as string[],
                    createdAt: new Date(doc.metadata.createdAt) as Date,
                    updatedAt: new Date(doc.metadata.updatedAt) as Date,
                    images: doc.metadata.images as string[],  
                    sellerId: doc.metadata.sellerId as string, 
                }))
                // console.log(vectorProducts);
                modifiedProducts.push(...vectorProducts)
                return modifiedProducts

                
            }
            catch(e){
                console.log(e);
                
            }
        }
        return modifiedProducts;

    }
}
const extraResolver={
    Product:{
        seller:async(parent:Product)=> {
            
            return prisma.user.findUnique({where:{id:parent.sellerId}})
        },
        Order:async(parent:Product)=>{
            return await prisma.order.findMany({
                where:{
                    products:{
                        some:{
                            id:parent.id
                        }
                    }
                }
            })
        },
        // categories:async(parent:Product)=>{
        //     return prisma.category.findUnique({where:{id:parent.id}})
        // }
    }
}

export const resolver={queries,extraResolver}