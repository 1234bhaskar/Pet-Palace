"use client"
import {ChartComponent} from '@/components/AdminComp/ChartComponent'
import { Dashboard } from '@/components/navbarcom/page'
import React, { useCallback, useEffect, useState } from 'react'
import { useGetCurrentUser } from '../../../hooks/user';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StatsCards from '@/components/AdminComp/card';
import OrdersTable from '@/components/AdminComp/OrdersTable';
import { useGetAllOrders, useGetAllSellers } from '../../../hooks/admin';
import { Order } from '../../../gql/graphql';
import SelllerTable from '@/components/AdminComp/SelllerTable';
import {format, parseISO} from 'date-fns';
import { CardComponent } from '@/components/card/page';
import { useGetAllProducts } from '../../../hooks/Products';



interface ChartDataInterface{
    month:String,
    sale:number
}

export default function Admin() {
    const {user}=useGetCurrentUser();
    const {product}=useGetAllProducts()
    const {orders} = useGetAllOrders();
    const {sellers}=useGetAllSellers()
    const Order=orders;

    const [Revenue,setTotalRevenue]=useState(0);
    const [NumberofSeller,setNumberofSeller]=useState(0)
    const [NumberofOrder,setNumberofOrder]=useState(0)
    const [NumberofProduct,setNumberofProduct]=useState(0)
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
        { month: "December", sale: 0 },
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
            setNumberofOrder(orders.length)
        }
    }, [Order]);
    
    useEffect(()=>{
        setNumberofSeller(sellers?.length? sellers.length : 0)
    },[sellers])    
    useEffect(()=>{
        setNumberofProduct(product?.length? product.length :0)
    },[product])

    useEffect(() => {
        fetchOrder(); 
    }, [fetchOrder]);
  return (
    <div className="flex flex-col max-h-screen">
            <div> <Dashboard name={user?.firstName as string} /></div>
            <div className="">
                <Tabs defaultValue="account" className="">
                    <div className='flex justify-center'>
                    <TabsList >
                        <TabsTrigger value="account">Analytics</TabsTrigger>
                        <TabsTrigger value="password">Orders</TabsTrigger>
                    </TabsList>
                    </div>
                    <TabsContent value="account">
                        <div className="flex flex-col md:grid md:grid-cols-12">
                            <div className="col-span-7 ">
                                <ChartComponent chartData={chartData}/>
                            </div>
                            <div className="md:col-span-5">
                                <div className="grid gap-4 grid-cols-2 mx-5">
                                    <CardComponent title="Total Revenue" money={Revenue} />
                                    <CardComponent title="Number of Sellers" content={NumberofSeller} />
                                    <CardComponent title="Total Orders" content={NumberofOrder} />
                                    <CardComponent title="Total Products" content={NumberofProduct} />
                                </div>
                                <div className='my-10 sm:mt-5'>
                                    <div className='text-4xl text-center my-2'>Our Sellers</div>
                                        <SelllerTable/>
                                </div>
                            </div>
                            
                        </div>
                    </TabsContent>
                    <TabsContent value="password">  <div className='flex justify-center mt-10'>
                                                        <OrdersTable/>
                                                    </div>
                    </TabsContent>
                </Tabs>
            </div>
            
           
        </div>
    
  )
}
