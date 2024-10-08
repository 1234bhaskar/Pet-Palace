"use client"

import Link from "next/link";
import {
  CircleUser,
  Menu,
  Package2,
  Search,
  PawPrint,
  ShoppingCart
} from "lucide-react";  





const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ]


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dropdowntest } from "./dropdown";
import { ModeToggle } from "./dark-light-mode";
import { AccordionDemo } from "./Accordion";
import { FC, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import { useRouter } from "next/navigation";

interface Dashboardprops{
  name:string
}

export const Dashboard:FC<Dashboardprops>=(props) =>{
  const CartNumber=useAppSelector(Cart => Cart.Cart.Cart)
  const CartQuantity = useMemo(() => {
    if(CartNumber){
      return CartNumber.reduce((total, item) => total + item.quantity, 0);
    }
  }, [CartNumber]);

  //search Functionality

  const dispatch=useAppDispatch();
  const [searchQuery,setSearchQuery]=useState('');
  const router=useRouter();
  function OnSearch(event:React.FormEvent){
    event.preventDefault();
    const encodedSearchQuery=encodeURI(searchQuery);
    router.push(`/Search?q=${encodedSearchQuery}`)
    console.log("search",encodedSearchQuery);
    
  }


  return (
    <div className="flex flex-col ">
      <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6 sm:z-10">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base "
          >
            <PawPrint className=" w-10 text-orange-900" />
            <span>Pet Palace</span>
          </Link>
          {/* <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground border px-5"
          >
            Pet Palace
          </Link> */}
          <Link
            href="/Search"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Dropdowntest/>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </Link>
          
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
              <PawPrint className=" text-orange-900" />
            <span>Pet Palace</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <AccordionDemo title="Categories"/>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 ">
          <form className="ml-10 flex-1 sm:flex-initial" onSubmit={OnSearch}>
            <div className="relative">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input onChange={(e)=>setSearchQuery(e.target.value)}
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[900px] rounded-full border focus:border-none border-slate-400 "
                />
            </div>
          </form>
          <div className="ml-auto flex items-center gap-3">
            {/* //Cart */}
          {/* <Link href={"/cart"} className="border-2 border-white relative"><span><ShoppingCart width={50} height={50}/></span> <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ml-1 px-2 bg-orange-800 rounded-full ">{CartQuantity}</span></Link> */}
          <Link href={"/cart"} className=" relative"><span><ShoppingCart width={30} height={30}/></span> <span className="absolute -top-1 px-2 -right-1 text-sm bg-orange-800 rounded-full">{CartQuantity}</span></Link>
          <ModeToggle/>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{props.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
}
    