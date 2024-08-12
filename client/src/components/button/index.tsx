import { Button } from "@/components/ui/button"
import { FC } from "react"

interface Buttonprops{
    title: string,
    width?: number
}

export const ButtonComponent:FC<Buttonprops>=({title,width}) =>{
    const widhtClass=`w-[${width}%]`
    return <Button variant="secondary" className={widhtClass}>{title}</Button>
}

