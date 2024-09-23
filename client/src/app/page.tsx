"use client"

import { CarouselPlugin } from "@/components/Carosel";
import {Categories} from "@/components/HomePage/Categories";
import { Dashboard } from "@/components/navbarcom/page";
import { useGetCurrentUser } from "../../hooks/user";

const slides = ["https://supertails.com/cdn/shop/files/Independence_Day_web-min.png?v=1723441484", 
  "https://supertails.com/cdn/shop/files/Henlo_banner-min_7011a6af-9326-4ab5-af78-1b8318051f7a.png?v=1723444055", 
"https://supertails.com/cdn/shop/files/Main_banner-min_47db4e1b-5c8a-4c63-9848-d0c1c1058af2.png?v=1723441812"
];

export default function Home() {
  const {user}=useGetCurrentUser();
  return (
    <>
      <div className="h-10"><Dashboard name={user?.firstName as string}/></div>
      <div className="mt-10"><CarouselPlugin slides={slides} sizefull={true} /></div>
      <div>
        <Categories/>
      </div>
    </>
  );
}
