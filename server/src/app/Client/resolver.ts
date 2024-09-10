import { PrismaClient, Product } from '@prisma/client'
import { Order } from '../Order';

const prisma = new PrismaClient()


const queries={
    getAllProduct:async()=>{
        const product=await prisma.product.findMany({
            include:{
                categories:true
            }
        });
       // console.log();
        
        const productsWithCategory = product.map((product)=>{
            return{
                ...product,
                categories:product.categories.map((categories)=>categories.name)
            }
        })
            return productsWithCategory;
        

        
    },
    getProuctById:async(parent:any,{id}:{id:string})=>{
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
        if(searchTerm==null){
            searchTerm="";
        }
               
            const products=await prisma.product.findMany({
                where:{
                    OR:[
                        {
                        name:{
                        contains:searchTerm, // case-insensitive search
                        mode:'insensitive',
                    },
                },{
                    description:{
                        contains:searchTerm, //if the term is present in description
                        mode:'insensitive',
                    }}
                    ]
                },
                include:{
                    categories:true
                }
            });

            console.log(products)

            if(products){
                const productsWithCategory=products.map((product)=>{
                    return{
                        ...product,
                        categories:product.categories.map((cat)=>cat.name),
                    }
                })
                return productsWithCategory;
            }else{
                return null;
            }
            
           
            
        
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
        }
    }
}

export const resolver={queries,extraResolver}
