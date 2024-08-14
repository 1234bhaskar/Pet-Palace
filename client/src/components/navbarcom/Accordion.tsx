import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { FC } from "react";
  
  interface AccordionProps{
    title:string;
  }
  
  export const AccordionDemo:FC<AccordionProps>=(props)=> {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{props.title}</AccordionTrigger>
          <AccordionContent>
            food
          </AccordionContent>
          <AccordionContent>
            Medicines
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
      