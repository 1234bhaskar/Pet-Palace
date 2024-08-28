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
    <div className='sm:w-3/4 mx-2 sm:mx-0 border border-white p-2 rounded-lg'>
         <Table>
      <TableHeader className=''>
        <TableRow className='bg-slate-900 '>
          <TableHead className="w-[100px]">id</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={order?.id}>
            <TableCell className="font-medium">{order?.User?.firstName +" " +order?.User?.lastName}</TableCell>
            <TableCell>{
             order?.Product?.map((p,index)=>p?.name).join(" , ")
          }
          </TableCell>
            <TableCell>{order?.quantity}</TableCell>
            <TableCell className="text-right">{order?.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </div>
  )
}
