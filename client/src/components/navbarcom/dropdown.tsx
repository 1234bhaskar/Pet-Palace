
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
  
  export function Dropdowntest() {
    const {categories}=useGetAllCategory();
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
            {categories?.map(categorie => <DropDownContentcomponent category={categorie?.name as string}/>)}
            </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }