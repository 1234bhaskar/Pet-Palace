
  import { MdOutlineKeyboardArrowDown } from "react-icons/md";

  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,

    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { DropDownContentcomponent } from "./dropdown-Content";
import { useGetAllCategory } from "../../../hooks/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Category } from "../../../gql/graphql";
import { useCallback } from "react";
import { AddCategories } from "@/app/Redux/Slices/Categories/Categories";
import { useAppDispatch } from "@/app/Redux/hooks";
  
  export function Dropdowntest() {
    const {categories}=useGetAllCategory();
    const dispatch=useAppDispatch();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center">
            <div>
            Categories
            </div>
            <div>
            <MdOutlineKeyboardArrowDown/>
            </div>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">  
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <div className="flex flex-col ml-5">
            {categories?.map((categorie,index) => <Link href={`/Search?categories=${categorie?.name}`} key={index} onClick={()=>dispatch(AddCategories(categorie?.name as string))} ><DropDownContentcomponent category={categorie?.name as string}/></Link>)}
            </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }