// filepath: c:\Users\NV_USER\Desktop\naqaa-dashboard\app\dashboard\cars\_components\updateFormComponents\SubCategorySelector.tsx
import React from "react";
import { Minus, Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";

type SubCategory = {
    name: string;
    category: {
        _id: string;
        name: string;
    };
    customFields?: any[];
    description: string;
    _id: string;
};

interface SubCategorySelectorProps {
    subCategories: SubCategory[];
    selectedSubCategoryIds: string[];
    onAddSubCategory: (subCategoryId: string) => void;
    onRemoveSubCategory: (subCategoryId: string) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    isLoading: boolean;
    validationError?: string;
}

const SubCategorySelector: React.FC<SubCategorySelectorProps> = ({
    subCategories,
    selectedSubCategoryIds,
    onAddSubCategory,
    onRemoveSubCategory,
    searchTerm,
    onSearchChange,
    isLoading,
    validationError
}) => {
    // Filter subcategories based on search term
    const filteredSubCategories = subCategories?.filter(
        (subCategory: SubCategory) =>
            subCategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subCategory.category.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            subCategory.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                    Sub Categories *
                </label>
                <input
                    onChange={(e) => onSearchChange(e.target.value.trim())}
                    value={searchTerm}
                    className="py-2 pl-[15px] pr-[10px] rounded-[5px] border border-[#D8D6DE] placeholder:text-[#B9B9C3] text-[12px] font-normal text-[#6E6B7B] outline-none"
                    type="text"
                    id="search"
                    placeholder="Search subcategories..."
                />
            </div>
            {validationError && (
                <p className="text-red-500 text-sm mb-2">
                    {validationError}
                </p>
            )}

            <div className="grid grid-cols-3 gap-5">
                {isLoading ? (
                    <div className="col-span-3 flex justify-center items-center py-8">
                        <ClipLoader size={30} />
                    </div>
                ) : filteredSubCategories?.length === 0 ? (
                    <p className="text-gray-500 text-center py-8 col-span-3">
                        No subcategories found for this search term.
                    </p>
                ) : (
                    filteredSubCategories?.map((subCategory: SubCategory) => {
                        const isSelected = selectedSubCategoryIds.some(
                            (sub) => sub === subCategory._id
                        );
                        return (
                            <div
                                key={subCategory._id}
                                className={`rounded-sm ${
                                    isSelected
                                        ? "bg-green-500"
                                        : "bg-white"
                                } transition-all duration-300 shadow-md p-4 flex justify-between items-center ${
                                    validationError
                                        ? "ring-2 ring-red-200"
                                        : ""
                                }`}
                            >
                                <div className="flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span
                                                className={`font-medium ${
                                                    isSelected
                                                        ? "text-white"
                                                        : "text-gray-800"
                                                }`}
                                            >
                                                {subCategory.name}
                                            </span>
                                            <span
                                                className={`${
                                                    isSelected
                                                        ? "text-white"
                                                        : "text-gray-600"
                                                } ml-2 capitalize`}
                                            >
                                                ({subCategory.category.name})
                                            </span>
                                        </div>
                                    </div>
                                    {subCategory.description && (
                                        <p
                                            className={`text-sm ${
                                                isSelected
                                                    ? "text-white"
                                                    : "text-gray-600"
                                            } mt-1`}
                                        >
                                            {subCategory.description}
                                        </p>
                                    )}
                                </div>
                                {isSelected ? (
                                    <Minus
                                        onClick={() => onRemoveSubCategory(subCategory._id)}
                                        className="hover:bg-black/10 text-white transition-all duration-300 rounded-full p-1 w-[28px] h-[28px] cursor-pointer"
                                    />
                                ) : (
                                    <Plus
                                        onClick={() => onAddSubCategory(subCategory._id)}
                                        className="hover:bg-slate-200 transition-all duration-300 rounded-full p-1 w-[28px] h-[28px] cursor-pointer"
                                    />
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default SubCategorySelector;
