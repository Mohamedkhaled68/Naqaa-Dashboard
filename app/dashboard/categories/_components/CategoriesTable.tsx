import React, { useState } from "react";
import CategoryRow from "./CategoryRow";
import { Category } from "../page";

const CategoriesTable = ({ categories }: { categories: Category[] }) => {
    const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

    const toggleAccordion = (categoryId: string) => {
        setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
    };

    return (
        <>
            <div className="w-full px-4 py-6 flex flex-col gap-4">
                {categories.map((category) => (
                    <CategoryRow
                        key={category._id}
                        category={category}
                        openCategoryId={openCategoryId}
                        toggleAccordion={toggleAccordion}
                    />
                ))}
            </div>
        </>
    );
};

export default CategoriesTable;
