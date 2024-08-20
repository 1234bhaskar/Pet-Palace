import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { useCreateProduct } from "../../../hooks/seller";

interface Category {
    id: number;
    name: string;
}

interface CategoryCheckboxesProps {
    categories: Category[];
}

const CategoryCheckboxes: React.FC<CategoryCheckboxesProps> = ({ categories }) => {

    const {mutate}=useCreateProduct();

    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
    const [productName, setProductName] = useState<string>("");
    const [productDesc, setproductDesc] = useState<string>("");
    const [productPrice, setProductPrice] = useState<number>();
    const [productStock, setProductStock] = useState<string>("");

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const categoryId = parseInt(event.target.value, 10);
        const category = categories.find((c) => c.id === categoryId);

        if (category) {
            const isSelected = selectedCategories.some((c) => c.id === categoryId);

            let updatedCategories;
            let updatedCategoryIds;
            if (isSelected) {
                // Remove the category if it's already selected
                updatedCategories = selectedCategories.filter((c) => c.id !== categoryId);
                updatedCategoryIds = selectedCategoryIds.filter((id) => id !== categoryId);
            } else {
                // Add the category if it's not selected
                updatedCategories = [...selectedCategories, category];
                updatedCategoryIds = [...selectedCategoryIds, categoryId];
            }

            setSelectedCategories(updatedCategories);
            setSelectedCategoryIds(updatedCategoryIds);
        }
    };
    

    const handleCreateProduct=useCallback(()=>{
        console.log("Selected Categories:", selectedCategoryIds);
        console.log("Product Name:", productName);
        console.log("Product Price:", productPrice);
        console.log("Product Stock:", productStock);

        mutate({
            name: productName,
            categoryIds: selectedCategoryIds,
            description: productDesc,
            price: Number(productPrice)
        })
        setProductName("")
        setProductPrice(undefined)
        setProductStock("")
        setproductDesc("")
        setSelectedCategoryIds([])
    },[productName,productPrice,productStock,selectedCategoryIds])


    return (
        <div className="md:grid md:grid-cols-12">
            <div className="col-span-4"></div>
            <div className="flex flex-col gap-3 md:col-span-5">
                <textarea
                    value={productName}
                    placeholder="Product Name"
                    rows={2}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border-b border-slate-700 text-xl resize-none focus:outline-none focus:border-blue-500"
                ></textarea>
                <textarea
                    value={productStock}
                    placeholder="Product Stock"
                    rows={2}
                    onChange={(e) => setProductStock(e.target.value)}
                    className="border-b border-slate-700 text-xl resize-none focus:outline-none focus:border-blue-500"
                ></textarea>
                <textarea
                    value={productDesc}
                    placeholder="Product Description"
                    rows={2}
                    onChange={(e) => setproductDesc(e.target.value)}
                    className="border-b border-slate-700 text-xl resize-none focus:outline-none focus:border-blue-500"
                ></textarea>
                <textarea
                    value={productPrice !== undefined ? productPrice.toString() : ""}
                    placeholder="Product Price"
                    rows={2}
                    onChange={(e) => {
                        const value = e.target.value;
                        const numberValue = value !== "" ? Number(value) : undefined;
                        setProductPrice(numberValue);
                    }}
                    className="border-b border-slate-700 text-xl resize-none focus:outline-none focus:border-blue-500"
                ></textarea>
                <div className="flex flex-wrap">
                {categories.map((category) => (
                        <div key={category.id} className="flex items-center mb-4 ml-10">
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                <input
                                    type="checkbox"
                                    value={category.id}
                                    checked={selectedCategoryIds.includes(category.id)}
                                    onChange={handleCategoryChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                {category.name}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <Button variant="secondary" onClick={handleCreateProduct} className="w-[15%] text-xl">
                        Submit
                    </Button>
                </div>
            </div>
            <div className="col-span-3"></div>
        </div>
    );
};

export default CategoryCheckboxes;
