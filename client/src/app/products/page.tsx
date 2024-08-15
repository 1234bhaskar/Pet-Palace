import { Dashboard } from '@/components/navbarcom/testing'
import Categories from '@/components/ProductPage/Categories'
import Filters from '@/components/ProductPage/Filters'
import ProductsDiv from '@/components/ProductPage/ProductsDiv'
import React from 'react'

export default function ProductPage() {
  return (
        <div className='w-full sm:px-32'>
        <Categories/>
        <Filters/>
        <ProductsDiv/>
        </div>
  )
}
