"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface RoleInterface{
    value: string,
    label: string,
}

interface ComboboxDemoProps {
    Role:RoleInterface[],
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  }

export const ComboboxDemo:React.FC<ComboboxDemoProps>=({value,setValue,Role})=> {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? Role.find((framework) => framework.value === value)?.label
            : "Select Role..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Role..." />
          <CommandList>
            <CommandEmpty>No Role found.</CommandEmpty>
            <CommandGroup>
              {Role.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    console.log(`Selected Role: ${currentValue}`);
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
