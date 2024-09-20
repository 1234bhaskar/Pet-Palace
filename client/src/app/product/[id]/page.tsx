"use client"

import { ButtonComponent } from "@/components/button";
import { CarouselDApiDemo } from "@/components/Carousel";
import { Dashboard } from "@/components/navbarcom/page";
import { CiStar } from "react-icons/ci";  
import { useGetCurrentUser } from "@/../../hooks/user";
import { useGetProductById } from "../../../../hooks/Products";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { AddProduct } from "../../Redux/Slices/Cart/Cart";


export default function Order() {

  const {user}=useGetCurrentUser();
  const {id} = useParams();
  const product=useGetProductById(id as string)
 // console.log(product);
  // useEffect(()=>{
  //   console.log(addToCart);
  // },[])

  const dispatch=useAppDispatch();

  return (
    <>
      <div className="h-10"><Dashboard name={user?.firstName as string}/></div>
      <p className="text-black mt-[100px]"> </p>
      <div className="flex flex-col  md:justify-around md:gap-10 md:flex-row  ">


        <div className=""> <CarouselDApiDemo/>  </div>


          <div className="flex flex-col gap-4 md:w-[40%]">
            <p className="text-5xl">
              {product.product?.name}
            </p>
            <div className="flex items-center">
              <CiStar /><CiStar /><CiStar /><CiStar /><CiStar />  
            </div>  
            <div className="md:text-2xl">
              {`₹ `+product.product?.price}
            </div>
            <div onClick={()=>dispatch(AddProduct(product.product))}>
              <ButtonComponent variant="secondary" title="Add to Cart" width={40}/>
            </div>
            <div>
              <ButtonComponent variant="secondary" title="Buy" width={40}/>
            </div>
            <div className="flex flex-col mt-10 gap-5">
              <div className="text-3xl font-bold ">
                Description
              </div>
              <p>
                {product.product?.description}

              </p>
            </div>
            <div className="flex gap-10 mt-8">
              <div className="font-semibold text-xl">Highlights</div>
              <div className="flex flex-col gap-2">
              <div>8 GB RAM | 128 GB ROM</div>
              <div>8 GB RAM | 128 GB ROM</div>
              <div>8 GB RAM | 128 GB ROM</div>  
              </div>
            </div>
            <div className="flex gap-10 mt-8">
              <div className="font-semibold text-xl">Highlights</div>
              <div className="flex flex-col gap-2">
              <div>8 GB RAM | 128 GB ROM</div>
              <div>8 GB RAM | 128 GB ROM</div>
              <div>8 GB RAM | 128 GB ROM</div>  
              </div>
            </div>
            <div className="flex gap-10 mt-8">
              <div className="font-semibold text-xl">Highlights</div>
              <div className="flex flex-col gap-2">
              <div>8 GB RAM | 128 GB ROM</div>
              <div>8 GB RAM | 128 GB ROM</div>
              <div>8 GB RAM | 128 GB ROM</div>  
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
