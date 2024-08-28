"use client"
import {ChartComponent} from '@/components/AdminComp/ChartComponent'
import { Dashboard } from '@/components/navbarcom/page'
import React, { useCallback, useEffect, useState } from 'react'
import { useGetCurrentUser } from '../../../hooks/user';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StatsCards from '@/components/AdminComp/card';
import OrdersTable from '@/components/AdminComp/OrdersTable';
import { useGetAllOrders } from '../../../hooks/admin';
import { Order } from '../../../gql/graphql';
import SelllerTable from '@/components/AdminComp/SelllerTable';
import {format, parseISO} from 'date-fns';



interface ChartDataInterface{
    month:String,
    sale:number
}

export default function Admin() {
          const {user}=useGetCurrentUser();
         const {orders} = useGetAllOrders();
         const Order=orders;
        const [Revenue,setTotalRevenue]=useState(0);
    const [chartData, setchartData] = useState<ChartDataInterface[]>([
        { month: "Janunary", sale: 0 },
        { month: "Febuary", sale: 0 },
        { month: "March", sale: 0 },
        { month: "April", sale: 0 },
        { month: "May", sale: 0 },
        { month: "June", sale: 0 },
        { month: "July", sale: 0 },
        { month: "August", sale: 0 },
        { month: "September", sale: 0 },
        { month: "October", sale: 0 },
        { month: "November", sale: 0 },
        { month: "December", sale: 0 },
    ]);



const fetchOrder = useCallback(() => {
        console.log(chartData)
        if (Order) {
            let updatedChartData = chartData.map(item => ({ ...item, sale: 0 }));
            
            Order?.forEach((order) => {
                if (order?.createdAt && order?.quantity) {
                const monthName = format(parseISO(order.createdAt), 'MMMM');

                const monthIndex = updatedChartData.findIndex(
                    (item) => item.month === monthName
                );
            
                updatedChartData[monthIndex].sale += order.quantity;

                }
            });
               if (JSON.stringify(updatedChartData) !== JSON.stringify(chartData)) {
                setchartData(updatedChartData);
            }

            const totalPrice = Order.reduce((total, item) => {
                if (item?.total) {
                    return total + item.total 
                }
                return total;
            }, 0);
            setTotalRevenue(totalPrice);

        }
    }, [Order]);
    
    
    useEffect(() => {
        fetchOrder(); 
    }, [fetchOrder]);
  return (
    <div className=' w-full justify-center'>
      <Dashboard name={user?.firstName as string}/>
          {/* Tabs */}
      <div className="flex flex-col w-full items-center ">
      <Tabs defaultValue="orders" className="w-full flex flex-col items-center h-full">
  <TabsList className='sm:w-1/4  my-5'>
    <TabsTrigger value="analitics">Analytics</TabsTrigger>
    <TabsTrigger value="orders">Orders</TabsTrigger>
  </TabsList>

  {/* Analitics */}
  <TabsContent value="analitics" className='w-full sm:flex  sm:px-10 gap-3'>

    {/* Graph Component */}
  <div className=' sm:w-[60%]'>
  <ChartComponent chartData={chartData}/>
  </div>
  <div className=" sm:w-[40%] mt-10 sm:mt-0 h-screen">

    {/** 4 Boxes for stats */}
    <div className='text-4xl text-center mt-5 ml-5 '>Revenue</div>
    <div className='grid grid-cols-2 place-items-center mt-5'>
    <StatsCards/>   
    </div>

    {/* Seller Table */}
    <div className='my-10 sm:mt-5'>
    <div className='text-4xl text-center my-2'>Our Sellers</div>
    <SelllerTable/>
    </div>
  </div>
  </TabsContent>

  {/* Orders table */}
  <TabsContent value="orders" className='w-full flex justify-center '>
     <OrdersTable/>
  </TabsContent>
</Tabs>

    </div>

           

        </div>
    
  )
}
