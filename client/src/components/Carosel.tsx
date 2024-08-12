"use client"
import  React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

 const imageArray =[
    {img1:"https://supertails.com/cdn/shop/files/Independence_Day_web-min.png?v=1723441484",key:1},
    {img1:"https://supertails.com/cdn/shop/files/Henlo_banner-min_7011a6af-9326-4ab5-af78-1b8318051f7a.png?v=1723444055",key:2},
    {img1:"https://supertails.com/cdn/shop/files/Main_banner-min_47db4e1b-5c8a-4c63-9848-d0c1c1058af2.png?v=1723441812",key:3},
 ]

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {imageArray.map((index) => (
          <CarouselItem key={index.key} >
            <div className="mt-6 ">
              <Card className="">
                <CardContent className="flex h-fit w-full">
                  <Image className="border w-full " src={index.img1} alt="slider_images" sizes="100vw" width={"100"} height={50} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
