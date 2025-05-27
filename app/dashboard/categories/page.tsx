"use client";
import GridContainer from "@/components/GridContainer";
import OptionsBar from "@/components/OptionsBar";
import useGetCategories from "@/hooks/categories/useGetCategories";
import React, { useEffect, useState } from "react";
import CategoriesTable from "./_components/CategoriesTable";
import { useModal } from "@/store/useModal";
import CreateCategoryForm from "./_components/CreateCategoryForm";

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
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { mutateAsync: getCategories } = useGetCategories();

    const { onOpen } = useModal();

    const fetchcategories = async () => {
        try {
            const data = await getCategories();

            console.log(data);
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchcategories();
    }, []);
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
            <CategoriesTable categories={categories} />
        </GridContainer>
    );
};

export default categories;
