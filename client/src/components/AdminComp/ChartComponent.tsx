"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetAllOrders } from "../../../hooks/admin"
import { FC, useCallback, useEffect, useState } from "react"



 const chartConfig = {
   desktop: {
     label: "Desktop",
     color: "hsl(var(--chart-1))",
   },
 } satisfies ChartConfig

 interface ChartDataInterface{
    month:String,
    sale:number
}

interface ChartComponentProps{
  chartData:ChartDataInterface[]
}


export const ChartComponent:FC<ChartComponentProps>=({chartData})=> {
  return (
    <div className=" px-2 ">

    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sale" fill="var(--color-desktop)" radius={16}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>

    {/* stats */}

              
    </div>
  )
}









