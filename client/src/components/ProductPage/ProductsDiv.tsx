"use client"
import React, { FC, useCallback, useEffect } from 'react'
import {ProductCard} from './ProductCard'
import Link from 'next/link';
import { useGetAllProducts, useGetSearchProduct } from '../../../hooks/Products';
import { Product } from '../../../gql/graphql';
import { useAppSelector } from '@/app/Redux/hooks';

interface ProductsDivInterface{
  Searchparams:string
}

export const ProductsDiv:FC<ProductsDivInterface>=({Searchparams})=> {
  const AllProducts =useGetAllProducts();
    //    const obj = [
      //      { id: '_a1b2c3d4e', name: 'Object 1', value: 100 },
      //      { id: '_f5g6h7i8j', name: 'Object 2', value: 200 },
      //      { id: '_k9l0m1n2o', name: 'Object 3', value: 300 },
      //      { id: '_p3q4r5s6t', name: 'Object 4', value: 400 },
      //      { id: '_u7v8w9x0y', name: 'Object 5', value: 500 }
      //  ];
      
      const Selectedcategoies=useAppSelector(categories => categories.Categories.name)
      console.log(Selectedcategoies);
      
      
  return (
    <div className='w-full border-2 grid sm:grid-cols-3 grid-cols-1 mt-3 sm:m-0' >
        {/* { AllProducts.product?.map((e)=>{
          return <ProductCard key={e?.id} product={e as Product} />
        }
       )} */}
      {
      Selectedcategoies
        ? AllProducts.product?.filter(product =>
            product?.categories?.some(category => category === Selectedcategoies)
          ).map((e) => (
            <ProductCard key={e?.id} product={e as Product} />
          ))
        : AllProducts.product?.map((e) => (
            <ProductCard key={e?.id} product={e as Product} />
          ))
      }
      
      
    </div>
  )
}
