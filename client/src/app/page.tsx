"use client"

import { CarouselPlugin } from "@/components/Carosel";
import {Categories} from "@/components/HomePage/Categories";
import { Dashboard } from "@/components/navbarcom/testing";
import { useGetCurrentUser } from "../../hooks/user";


export default function Home() {
  const {user}=useGetCurrentUser();
  return (
    <>
      <div className="h-10"><Dashboard name={user?.firstName as string}/></div>
      <div className="w-screen mt-6 sm:flex sm:visible invisible justify-center "><CarouselPlugin/></div>
      <div>
        <Categories/>
      </div>
    </>
  );
}
