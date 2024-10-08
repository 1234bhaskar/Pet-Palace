import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

interface CardComponentprops{
    title:string
    content?:number
    money?:number
    // sign?:"DollarSign" | "Users" | "CreditCard" | "Activity"
}

export const CardComponent: FC<CardComponentprops> = (props) => {
    return (
    <div>
        <Card x-chunk="dashboard-01-chunk-0" className="py-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
            
            </CardHeader>
            <CardContent>
            {props.content && (<div className="text-2xl font-bold">{props.content}</div>)}
            {props.money && (<div className="text-2xl font-bold">₹{props.money}</div>)}
            </CardContent>
        </Card>
    </div>
    );
};
