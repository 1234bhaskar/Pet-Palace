import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { FC } from "react";
import { AccordionContentComp } from "./AccordionContent";
import { useGetAllCategory } from "../../../hooks/user";
  
  interface AccordionProps{
    title:string;
  }
  
  export const AccordionDemo:FC<AccordionProps>=(props)=> {

    const {categories}=useGetAllCategory();
    
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{props.title}</AccordionTrigger>
          <div className="ml-5">
            {categories?.map((category)=>(<AccordionContentComp category={category?.name as string}/>))}
          </div>
        </AccordionItem>
      </Accordion>
    )
  }
      