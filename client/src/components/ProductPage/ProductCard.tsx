import React, { FC } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../../../gql/graphql'

interface ProductCardProp{
  product:Product
}
export const ProductCard:FC<ProductCardProp>=(props)=> {

  const {product}=props;
  return (
      <Link href={"/product/"+product.id}  className=''>
   <Card className='sm:h-[400px] flex flex-col '>
    <CardDescription className='h-4/5 flex sm:p-2 justify-center '>
        <Image className='' src={product.images?.[0] as string} alt='product' width={300} height={100} quality={75} />
    </CardDescription>
  
    <CardContent className='h-1/5' >
    <p>{(product.name.length>100)?product.name.substring(0,100)+"...":product.name}</p>
    <p>${product.price}</p>
  </CardContent>
</Card>

</Link>
  )
}
