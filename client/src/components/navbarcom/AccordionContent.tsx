import { FC } from "react";

import {
    AccordionContent,
} from "@/components/ui/accordion"

interface dropDown_Content{
    category?:string
}

export const AccordionContentComp:FC<dropDown_Content>=({category})=>{
    return(
        <AccordionContent>
            {category}
        </AccordionContent>
    )
}