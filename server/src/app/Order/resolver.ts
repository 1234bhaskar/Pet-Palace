import { PrismaClient,Order } from '@prisma/client'
import { CreateOrderItemPayload, GraphqlContext } from '../../interface'
const prisma = new PrismaClient()
import axios from "axios"
import * as dotenv from "dotenv"
import { json } from 'body-parser'

dotenv.config()


const generate_PayPal_Token= async()=>{
    const res=await axios({
        url:"https://api-m.sandbox.paypal.com"+"/v1/oauth2/token",
        method:"post",
        data:"grant_type=client_credentials",
        auth:{
            
            username:process.env.PAYPAL_CLIENT as string,
            password:process.env.PAYPAL_SECRET as string
        }
    })
    console.log(res.data.access_token);
    
    return res.data.access_token
}

const queries={
    getAllOrder:async(parent:any,arg:any)=>{
        const Order=prisma.order.findMany({})
        return Order
    }
}

const mutations={
    CreateOrder:async(parent:any,{payload}:{payload:CreateOrderItemPayload},ctx:GraphqlContext)=>{
        // console.log("payload",payload);
        
        if(!ctx.user){
            throw new Error('User is not logged in')
        }
        if(!payload){
            throw new Error('Payload undefined')
        }
        try{
            const access_token=await generate_PayPal_Token();
            const items = payload.Products.map( (product) => {
                if (!product.name || typeof product.price !== 'number' || typeof product.quantity !== 'number') {
                    throw new Error(`Invalid product data: ${JSON.stringify(product)}`);
                }
                return {
                    name: product.name,
                    unit_amount: {
                        currency_code: "USD",
                        value: product.price
                    },
                    quantity: product.quantity.toString()
                };
            });
            console.log(items);
            
                const res=await axios({
                    url:"https://api-m.sandbox.paypal.com"+"/v2/checkout/orders",
                    method:"post",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${access_token}`
                    },
                    data:JSON.stringify({
                        intent:"CAPTURE",
                        purchase_units:[
                            {
                                items:items,
                                amount: {
                                    currency_code: "USD",
                                    value: payload.total.toFixed(2),
                                    breakdown: {
                                        item_total: {
                                            currency_code: "USD",
                                            value: payload.total.toFixed(2)
                                        }
                                    }
                                },
                                shipping: {
                                    address: {
                                        address_line_1: payload.address
                                    }
                                }
                            }
                        ]
                    })
                })
                console.log(res.data);
        }
        catch(e){
            console.log("error in payment",e)
            return false
        }
        return true;

        // try{
        //     const Order=await prisma.order.create({
        //         data:{
        //             total:payload.total,
        //             address:payload.address,
        //             products: {
        //                 connect: payload.Product.map(product => ({ id:product.id })),
        //             },
        //             userId:ctx.user.id,
        //             quantity:payload.Product.length
        //         }
        //     })
        //     console.log(Order);
        //     return true;
        // }
        // catch(e){
        //     console.error(e);
        //     return false;
        // }
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