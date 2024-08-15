import React from 'react'
import ProductCard from './ProductCard'

export default function ProductsDiv() {
  return (
    <div className='w-full border-2 grid sm:grid-cols-3 grid-cols-1 mt-3 sm:m-0'>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
    </div>
  )
}
