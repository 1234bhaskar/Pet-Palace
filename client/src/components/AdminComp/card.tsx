import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function StatsCards() {
  return (
    <>
          <Card x-chunk="dashboard-05-chunk-1" className='w-fit'>
                <CardHeader className="pb-2">
                  <CardDescription>Total orders</CardDescription>
                  <CardTitle className="text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                {/* <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter> */}
              </Card>

                <Card x-chunk="dashboard-05-chunk-1" className='w-fit'>
                <CardHeader className="pb-2">
                  <CardDescription>Total Sales</CardDescription>
                  <CardTitle className="text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                {/* <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter> */}
              </Card>
             
                <Card x-chunk="dashboard-05-chunk-1" className='w-fit'>
                <CardHeader className="pb-2">
                  <CardDescription>Total Sales</CardDescription>
                  <CardTitle className="text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                {/* <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter> */}
              </Card>
              
                <Card x-chunk="dashboard-05-chunk-1" className='w-fit'>
                <CardHeader className="pb-2">
                  <CardDescription>Total Sales</CardDescription>
                  <CardTitle className="text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                {/* <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter> */}
              </Card>
                  </>
  )
}
