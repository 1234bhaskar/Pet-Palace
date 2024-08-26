import { PrismaClient,Order } from '@prisma/client'
import { CreateOrderItemPayload, GraphqlContext } from '../../interface'
const prisma = new PrismaClient()


const queries={
    getAllOrder:async(parent:any,arg:any)=>{
        const Order=prisma.order.findMany({})
        return Order
    }
}

const mutations={
    CreateOrder:async(parent:any,{payload}:{payload:CreateOrderItemPayload},ctx:GraphqlContext)=>{
        if(!ctx.user){
            throw new Error('User is not logged in')
        }
        try{
            const Order=await prisma.order.create({
                data:{
                    total:payload.total,
                    address:payload.address,
                    products: {
                        connect: payload.ProductId.map(id => ({ id })),
                    },
                    userId:ctx.user.id,
                    quantity:payload.ProductId.length
                }
            })
            console.log(Order);
            return true;
        }
        catch(e){
            console.error(e);
            return false;
        }
    }
}

const extraResolver={
    Order:{
        Product:async(parent:Order,arg:any)=>{
            return await prisma.product.findMany({
                where: {
                    orders: {
                        some: {
                            id: parent.id,
                        },
                    },
                },
            })
        },
        User:async(parent:Order)=>{
            return await prisma.user.findUnique({ where:{id:parent.userId}})
        }
    }
}

export const resolvers={queries,mutations,extraResolver}