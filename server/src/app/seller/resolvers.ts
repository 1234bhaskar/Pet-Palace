import { prismaClient } from "../../clients/db";
import { CreateProductPayload, GraphqlContext } from "../../interface";

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

export const resolvers={mutations}