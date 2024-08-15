import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
export default function ProductCard() {
  return (
    <div className=' place-self-center my-5'>
   <Card>
  <CardHeader>
    <CardDescription>
        <Image className='' src={"https://cdn.shopify.com/s/files/1/0565/8021/0861/products/Frame2_13_1.jpg?v=1696580837"} alt='product' width={200} height={10}/>
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>{"collar"}</p>
  </CardContent>
  <CardFooter>
    <p>${"30"}</p>
  </CardFooter>
</Card>

    </div>
  )
}
