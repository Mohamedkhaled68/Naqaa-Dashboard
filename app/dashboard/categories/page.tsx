"use client";
import GridContainer from "@/components/GridContainer";
import OptionsBar from "@/components/OptionsBar";
import useGetCategories from "@/hooks/categories/useGetCategories";
import React, { useState } from "react";
import CategoriesTable from "./_components/CategoriesTable";
import { useModal } from "@/store/useModal";
import CreateCategoryForm from "./_components/CreateCategoryForm";
import { ClipLoader } from "react-spinners";

type SubCategory = {
    _id: string;
    name: string;
    category: string;
    description: string;
    createdAt: string; // or Date if you plan to convert it
    updatedAt: string; // or Date if you plan to convert it
};

export type Category = {
    name: string;
    _id: string;
    subCategories: SubCategory[];
};

const categories = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { data: categories, isLoading } = useGetCategories(searchTerm.trim());

    console.log(categories);

    const { onOpen } = useModal();

    return (
        <GridContainer className="flex flex-col pb-[10px]">
            <OptionsBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                pageOption={
                    <button
                        onClick={() => {
                            onOpen(<CreateCategoryForm />);
                        }}
                        className="cursor-pointer py-2 px-[38px] rounded-[5px] bg-[#222] text-[12px] font-normal text-[#fff] outline-none"
                    >
                        Add Category
                    </button>
                }
            />
            {isLoading || !categories ? (
                <div className="text-xl font-bold flex justify-center items-center text-center p-6">
                    <ClipLoader size={50} />
                </div>
            ) : categories?.length > 0 ? (
                <CategoriesTable categories={categories} />
            ) : (
                <>
                    <div className="text text-center text-gray-500 text-sm py-5">
                        No categories available at the moment.
                    </div>
                </>
            )}
        </GridContainer>
    );
};

export default categories;
