"use client"
import React, { FC, useCallback, useEffect } from 'react'
import {ProductCard} from './ProductCard'
import Link from 'next/link';
import { useGetAllProducts,useGetProductsBySearch } from '../../../hooks/Products';
import { Product } from '../../../gql/graphql';
import { useAppSelector } from '@/app/Redux/hooks';

interface ProductsDivInterface{
  Searchparams:string | null
}

export const ProductsDiv:FC<ProductsDivInterface>=({Searchparams})=> {
  const SearchProduct = (Searchparams?.length==0)?useGetProductsBySearch(""):useGetProductsBySearch(Searchparams as string);
      const Selectedcategoies=useAppSelector(categories => categories.Categories.name)
      console.log(Selectedcategoies);
  return (
    <div className='w-full grid sm:grid-cols-3 grid-cols-1 mt-3 gap-5 sm:m-0 sm:px-10' >
      {

        Searchparams? SearchProduct.product?.map((p)=>(
          <ProductCard key={p?.id} product={p as Product} />
        )):Selectedcategoies
                ? SearchProduct.product?.filter((products) =>
            products?.categories?.some((category) => category === Selectedcategoies)
          ).map((e) => (
            <ProductCard key={e?.id} product={e as Product} />
          ))
        : SearchProduct.product?.map((e) => (
            <ProductCard key={e?.id} product={e as Product} />
          ))
      }
      
      
    </div>
  )
}
