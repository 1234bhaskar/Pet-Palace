"use client"
import { CardComponent } from "@/components/card/page";
import { Dashboard } from "@/components/navbarcom/page";
import { FC } from "react";
import { useGetCurrentUser } from "../../../hooks/user";
import CategoryCheckboxes from "@/components/radioButton/page";

interface Category {
    id: number;
    name: string;
}

const categories: Category[] = [
    { id: 1, name: "Dog" },
    { id: 2, name: "Cat" },
    { id: 3, name: "Cloths" },
    { id: 4, name: "Toy" },
];

export default function ProductPage() {

    const { user } = useGetCurrentUser();

    return (
        <div className="flex flex-col gap-7">
            <Dashboard name={user?.firstName as string} />
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mx-5">
                <CardComponent title="Total Revenue" content="$45,231.89" />
                <CardComponent title="Oder Pending" content="100" />
                <CardComponent title="Cancelled Orders" content="2" />
                <CardComponent title="Total Revenue" content="$45,231.89" />
            </div>
            <div>
                <CategoryCheckboxes
                    categories={categories}
                />
            </div>
        </div>
    );
}
