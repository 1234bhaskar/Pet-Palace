"use client"
import {DropdownMenuItem} from "@/components/ui/dropdown-menu"
import { FC } from "react"
import {
    User,
    Shapes
  } from "lucide-react"

interface dropDown_Content{
    category?:string
}

export const DropDownContentcomponent:FC<dropDown_Content>=({category})=>{
    return(
        <DropdownMenuItem>
      {/* <Shapes className="mr-2 h-4 w-4" /> */}
        <span>{category}</span>
    </DropdownMenuItem>
    )
}
