import { Button } from "@/components/ui/button"
import { FC } from "react"

interface Buttonprops{
    title: string,
    width?: number,
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"
}

export const ButtonComponent:FC<Buttonprops>=({title,width,variant}) =>{
    const widhtClass=`w-[${width}]`
    return <Button variant={variant} className={widhtClass}>{title}</Button>
}

