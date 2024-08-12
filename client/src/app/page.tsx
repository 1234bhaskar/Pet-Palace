"use client"

import { CarouselPlugin } from "@/components/Carosel";
import {Categories} from "@/components/HomePage/Categories";
import { Dashboard } from "@/components/navbarcom/testing";


export default function Home() {

  return (
    <>
      <div className="h-10"><Dashboard/></div>
      <div className="w-screen mt-6 sm:flex sm:visible invisible justify-center "><CarouselPlugin/></div>
      <div>
        <Categories/>
      </div>
    </>
  );
}
