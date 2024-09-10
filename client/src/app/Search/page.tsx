"use client"
import { Dashboard } from "@/components/navbarcom/page";
import Categories from '@/components/ProductPage/Categories'
import Filters from '@/components/ProductPage/Filters'
import {ProductsDiv} from '@/components/ProductPage/ProductsDiv'
import { useSearchParams } from "next/navigation";
import React from 'react'
import { useAppDispatch } from "../Redux/hooks";
import { useGetCurrentUser } from "../../../hooks/user";

export default function ProductPage() {
  const search=useSearchParams();
  const searchQuery=search?search.get("q"):"";
const {user}=useGetCurrentUser();
  

  // const encodedSearchQuery=encodeURI(searchQuery || "");
  // console.log("Search Params",encodedSearchQuery);
  
  return (
        <div className='w-full sm:px-32 relative'>
        <div className="h-10 absolute left-0"><Dashboard name={user?.firstName as string}/></div>
        <Categories/>
        <Filters/>
        <ProductsDiv Searchparams={searchQuery}/>
        </div>
  )
}
