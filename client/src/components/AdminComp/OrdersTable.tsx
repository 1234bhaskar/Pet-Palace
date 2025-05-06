import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"
import { useGetAllOrders } from '../../../hooks/admin'


export default function OrdersTable() {
const {orders}=useGetAllOrders();

const orderNames:any=[];
  return (
    <div className='sm:w-3/4 mx-2 sm:mx-0 border-b border-slate-700 p-2 rounded-lg'>
         <Table>
      <TableHeader className=''>
        <TableRow className=''>
          <TableHead className="w-52 text-lg">Customer Name</TableHead>
          <TableHead className='text-lg'>Product</TableHead>
          <TableHead className='text-lg'>Quantity</TableHead>
          <TableHead className="text-right text-lg">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={order?.id}>
            <TableCell className="text-lg">{order?.User?.firstName +" " +order?.User?.lastName}</TableCell>
            <TableCell>{
             <div className='flex flex-col gap-3'>
              {order?.Product?.map((p,index)=> <div key={index} className='flex gap-4'><div className='text-2xl'>{index+1}.</div>  <div className='text-lg'>{p?.name}</div></div>)}
             </div>
          }
          </TableCell>
            <TableCell className='text-lg'>{order?.quantity}</TableCell>
            <TableCell className="text-right text-lg">$ {order?.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </div>
  )
}
