"use client"
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetAllSellers } from '../../../hooks/admin'
import Image from 'next/image';


export default function SelllerTable() {
    const Seller=useGetAllSellers();
  return (
    <div className='border rounded-md dark:border-slate-700 mx-2 h-full border-slate-200'>
  <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Sellers</TableHead>
      <TableHead>Name</TableHead>
      <TableHead className="text-right">Date of joinig</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        Seller.sellers?.map((seller,index)=>{
            return(
                <TableRow key={index}>
                <TableCell className="font-medium"><Image src={seller?.profileImageURL as string} alt='seller' height={20} width={20} className='rounded-sm border border-gray-400'/></TableCell>
                <TableCell>{seller?.firstName}</TableCell>
                <TableCell className="text-right">{seller?.createdAt.slice(0, 10) }</TableCell>
                </TableRow>
            )
        })
    }
  </TableBody>
</Table>

    </div>
  )
}
