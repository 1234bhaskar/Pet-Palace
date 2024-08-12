"use client"

import { ButtonComponent } from "@/components/button";
import { CarouselDApiDemo } from "@/components/Carousel";
import { Dashboard } from "@/components/navbarcom/testing";
import { CiStar } from "react-icons/ci";  


export default function Order() {

  return (
    <>
      <div className="h-10"><Dashboard/></div>
      <p className="text-black mt-[100px]"> </p>
      <div className="flex flex-col  md:justify-around md:gap-10 md:flex-row  ">


        <div className="z-[-1]"> <CarouselDApiDemo/>  </div>


          <div className="flex flex-col gap-4 md:w-[40%]">
            <p>
            Crucial RAM 8GB DDR4 3200MHz CL22 (or 2933MHz or 2666MHz) Laptop Memory CT8G4SFRA32A
            </p>
            <div className="flex items-center">
              <CiStar /><CiStar /><CiStar /><CiStar /><CiStar />  
            </div>  
            <div className="md:text-2xl">
              Price
            </div>
            <div>
              <ButtonComponent title="Add to Cart" width={40}/>
            </div>
            <div>
              <ButtonComponent title="Buy" width={40}/>
            </div>
            <div className="flex flex-col mt-10 gap-5">
              <div className="text-3xl font-bold ">
                Description
              </div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt, minima aspernatur nemo temporibus nisi dignissimos ex assumenda quibusdam! Iure voluptatibus neque molestias laudantium! In sint reprehenderit nisi facere architecto ipsa totam dolorem magni sequi quas laudantium, cum cupiditate!
              </p>
            </div>
            <div className="flex gap-10 mt-8">
              <div className="font-semibold text-xl">Highlights</div>
              <div className="flex flex-col gap-2">
              <div>8 GB RAM | 128 GB ROM</div>
              <div>8 GB RAM | 128 GB ROM</div>
              <div>8 GB RAM | 128 GB ROM</div>  
              </div>
            </div>
            <div className="flex gap-10 mt-8">
              <div className="font-semibold text-xl">Highlights</div>
              <div className="flex flex-col gap-2">
              <div>8 GB RAM | 128 GB ROM</div>
              <div>8 GB RAM | 128 GB ROM</div>
              <div>8 GB RAM | 128 GB ROM</div>  
              </div>
            </div>
            <div className="flex gap-10 mt-8">
              <div className="font-semibold text-xl">Highlights</div>
              <div className="flex flex-col gap-2">
              <div>8 GB RAM | 128 GB ROM</div>
              <div>8 GB RAM | 128 GB ROM</div>
              <div>8 GB RAM | 128 GB ROM</div>  
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
