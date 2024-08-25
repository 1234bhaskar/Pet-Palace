"use client"
import {ExpandableCardDemo} from "@/components/blocks/expandable-card-demo-standard";
import { AccordionDemo } from "@/components/navbarcom/Accordion";
import { Dashboard } from "@/components/navbarcom/page";
import { useGetCurrentUser } from "../../../hooks/user";
import { useAppSelector } from "@/app/Redux/hooks";
import { useCallback, useEffect, useState } from "react";

interface Productprops {
    id:string,
    name: string;
    description?: string;
    price: number;
    imageURL?:string,
    stock?:Boolean,
    quantity:number
}



export default function Order() {
    const [products, setProducts] = useState<Productprops[]>([]);
    const CartNumber=useAppSelector(Cart => Cart.Cart)
    const [TotalPrice, setTotalPrice]=useState<number>(0)

    
    const fetchCartProducts=useCallback(()=>{
        const fetchCartProducts:Productprops[]=CartNumber.map((cart)=>{
            return cart
        })
        setProducts(fetchCartProducts);
        const totalPrice = CartNumber.reduce((total, item) => total + item.price * item.quantity, 0);
        setTotalPrice(totalPrice);
    },[CartNumber])
    
    // console.log(products)
    
    // const fetchCartProducts=useCallback(async()=>{
    //     const fetchedProducts: Productprops[] = await Promise.all(
    //         CartNumber.map(async (ProductId) => {
    //             const { getProuctById: product } = await graphqlClient.request(GetProductByIdQuery, { id: ProductId.id });
    //             return {
    //                 name: product?.name as string,
    //                 description: product?.description,
    //                 price: product?.price as number,
    //             };
    //         })
    //     );
    //     setProducts(fetchedProducts); 
        
    // },[CartNumber])
    useEffect(() => {
        fetchCartProducts(); // Fetch products when CartNumber changes
    }, [fetchCartProducts]);


    const {user}=useGetCurrentUser();

    return(
        <div className=" flex flex-col">
            <div className="h-10"><Dashboard name={user?.firstName as string}/></div> {/* navbar */}
            
            <div className="text-4xl font-medium md:text-7xl md:ml-10 md:mt-10 text-slate-800 dark:text-slate-300 ">Cart</div>

            <div className="md:grid md:grid-cols-12 md:mt-20" >
                
                <div className="md:col-span-8 mr-6">{products.map((product:Productprops,index: number) => ( <div className="flex items-center justify-around"> <ExpandableCardDemo key={index}  product={product} /> <div className="text-xl">x{product.quantity}</div> </div> ))}</div>

                <div className="md:col-span-4 md:m-6 ">
                    <div className="text-3xl">Total Price</div>
                    <div className="text-3xl mt-4"> ${TotalPrice}</div>
                    <AccordionDemo title="Sub-Total"/>
                </div>

            </div>
        </div>
    )
}