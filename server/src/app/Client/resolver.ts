import { PrismaClient, Product } from '@prisma/client'

const prisma = new PrismaClient()


const queries={
    getAllProduct:async(parent:any,args:any)=>{
        const product=await prisma.product.findMany({
            include:{
                categories:true
            }
        });
        return product
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
        if (product) {
            // Map categories to just their names
            const categories = product.categories.map(category => category.name);
    
            return {
                ...product,
                categories // Replace categories with just the names
            };
        } 
        else{
            return null
        }
    }
}
const extraResolver={
    Product:{
        seller:async(parent:Product)=> {
            return prisma.user.findUnique({where:{id:parent.sellerId}})
        }
    }
}

export const resolver={queries,extraResolver}
