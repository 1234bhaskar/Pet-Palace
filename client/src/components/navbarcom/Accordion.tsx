import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Categories</AccordionTrigger>
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
      