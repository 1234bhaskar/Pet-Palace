import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { useCreateProduct } from "../../../hooks/seller";
import { CiImageOn } from "react-icons/ci";
import toast from "react-hot-toast";
import axios from "axios"
import Image from "next/image";
import { graphqlClient } from "../../../GraphqlClient/api";
import { getSignedURLForProductQuery } from "../../../graphql/query/seller";
import { NextURL } from "next/dist/server/web/next-url";

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
    const [imageURLs, setImageURLs] = useState<string[]>([]);
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
        console.log("Product Url:", imageURLs);

        mutate({
            name: productName,
            categoryIds: selectedCategoryIds,
            description: productDesc,
            price: Number(productPrice),
            images:imageURLs
        })
        setProductName("")
        setProductPrice(undefined)
        setProductStock("")
        setproductDesc("")
        setImageURLs([])
        setSelectedCategoryIds([])
    },[productName,productPrice,productStock,selectedCategoryIds,imageURLs])


    const handlerInputChangeFile = useCallback((input: HTMLInputElement) => {

        return async (event: Event) => {
    
        event?.preventDefault();
    
        const files: FileList | null | undefined = input.files;
        if (!files) return;
    
        const uploadPromises = Array.from(files).map(async (file) => {
            console.log(file);
    
            // Request signed URL for each file
            const { getSignedURLForProduct } = await graphqlClient.request(getSignedURLForProductQuery, {
                imageName: file.name,
                imageType: file.type,
            });
    
            console.log(getSignedURLForProduct);
    
            if (getSignedURLForProduct) {
                toast.loading("Uploading...", { id: '2' });
    
              // Upload each file to S3
            await axios.put(getSignedURLForProduct, file, {
                headers: {
                    "Content-Type": file.type,
                },
            });
    
            toast.success("Upload Complete", { id: '2' });
    
            const url = new NextURL(getSignedURLForProduct);
            const myfilepath = `${url.origin}${url.pathname}`;
              // Optionally store or handle the URL of each uploaded file
            setImageURLs(prev => [...prev, myfilepath]);
            }
        });
    
        await Promise.all(uploadPromises);
        }
    }, []);

    const handleSelectImage = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.setAttribute("multiple", "true"); // Allow multiple file selection
    
        const handlerFn = handlerInputChangeFile(input);

        input.addEventListener("change", handlerFn);
    
        input.click();
    }, []);


    return (
        <div className="md:grid md:grid-cols-12">
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
                <CiImageOn onClick={handleSelectImage} className="text-2xl hover:text-blue-300" />
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
            <div className="col-span-7">
            <div className="grid grid-cols-3 ">
                {imageURLs && imageURLs.map(imageURL => { return(<div className="col-span-1"><Image src={imageURL} alt="tweet-image" height={400} width={400}/> </div>)})}
            </div>
            </div>
        </div>
    );
};

export default CategoryCheckboxes;
