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
      <Link href={"/product/"+product.id}  className=' place-self-center my-5'>
   <Card>
  <CardHeader>
    <CardDescription>
        <Image className='' src={product.images?.[0] as string} alt='product' width={200} height={10}/>
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>{product.name}</p>
  </CardContent>
  <CardFooter>
    <p>${product.price}</p>
  </CardFooter>
</Card>

</Link>
  )
}
