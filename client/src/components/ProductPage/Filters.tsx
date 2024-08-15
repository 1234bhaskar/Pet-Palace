import React from 'react'
import { Menu, Search } from 'lucide-react'
import { ChevronDown } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from '../ui/button';
import Link from 'next/link';
import { AccordionDemo } from '../navbarcom/Accordion';


export default function Filters() {
  return (
    
     <div className='sm:w-full sm:justify-between sm:mt-5 sm:py-2  sm:flex sm:px-2 '>
         <span className='sm:w-1/2 flex justify-between invisible sm:visible'>
         <button className='border rounded-sm sm:p-2 bg-black text-white '>In-Stock</button>
         <button className='border rounded-sm sm:p-2 '>On sale</button>
         <button className='border rounded-sm sm:p-2 flex'>{"Price"}<ChevronDown/></button>
         <button className='border rounded-sm sm:p-2 flex'>{"Sort-by"}<ChevronDown/></button>
         </span>

           <div className='flex justify-between  mx-5 sm:mx-0 sm:justify-end'>
            <span className='flex sm:justify-end   border-2  p-2 border-black '>
             <span className=' flex items-center rounded-md'>
             <Search/>
             <input  type="text" className='outline-none' placeholder="Search for you's"/>
             </span>
             </span>
     
    <span className='  sm:invisible sm:hidden'>
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
              <AccordionDemo/>
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
    </span>

      </div>
    </div>

  )
}
