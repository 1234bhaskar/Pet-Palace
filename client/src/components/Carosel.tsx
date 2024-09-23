"use client"
import React, { FC } from "react"
import Image from "next/image"
import Carousel from "./Carousel/page"



interface CarouselPluginProps {
  slides: string[]
  sizefull: Boolean
}

export const CarouselPlugin: FC<CarouselPluginProps> = ({ slides, sizefull }) => {
  console.log(slides);

  return (
    <div className="relative">
      {sizefull ? 

      (<div className="w-full ">
        <Carousel slides={slides} />
      </div>) : 

      (<div className="max-w-lg max-h-5">
        <Carousel slides={slides} />
      </div>)}
    </div>
  )
}
