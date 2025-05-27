import React from "react";
import { Category } from "../page";
import { ChevronDown, ChevronUp } from "lucide-react";

type CategoryRowProps = {
    category: Category;
    openCategoryId: string | null;
    toggleAccordion: (id: string) => void;
};

const CategoryRow = ({
    category,
    openCategoryId,
    toggleAccordion,
}: CategoryRowProps) => {
    return (
        <div
            key={category._id}
            className="border border-slate-50 shadow-md rounded mb-2  cursor-pointer"
        >
            <div className="w-full flex items-center justify-between pr-8 cursor-pointer">
                <button
                    className="w-full text-left p-4 font-medium transition cursor-pointer"
                    onClick={() => toggleAccordion(category._id)}
                >
                    {category.name}
                </button>

                {openCategoryId === category._id ? (
                    <ChevronUp className="text-slate-600" />
                ) : (
                    <ChevronDown className="text-slate-600" />
                )}
            </div>

            {openCategoryId === category._id && (
                <div className="pl-6 pr-4 pb-4">
                    {category.subCategories.length > 0 ? (
                        category.subCategories.map((sub) => (
                            <div key={sub._id} className="py-1 text-gray-700">
                                • {sub.name}
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-gray-500 italic">
                            No subcategories
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoryRow;
