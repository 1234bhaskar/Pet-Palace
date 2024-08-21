import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const queries={
    getAllProduct:async(parent:any,args:any)=>{
        const product=await prisma.product.findMany({});
        return product
    },
    getProuctById:async(parent:any,{id}:{id:number})=>{
        return await prisma.product.findUnique({where:{id}})
    }
}

export const resolver={queries}
