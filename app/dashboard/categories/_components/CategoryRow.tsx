import React, { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    Trash2,
    AlertTriangle,
    Edit,
} from "lucide-react";
import useDeleteCategory from "@/hooks/categories/useDeleteCategory";
import toast from "react-hot-toast";
import useDeleteSubCategories from "@/hooks/subCategories/useDeleteSubCategories";
import CreateSubcategoryForm from "./CreateSubCategoriesForm";
import UpdateSubcategoryForm from "./UpdateSubcategoryForm";
import UpdateCategoryForm from "./UpdateCategoryForm";
import { useModal } from "@/store/useModal";
import ShowAndCreateFields from "./ShowAndCreateFields";
import DeletionWarningModal from "@/components/DeletionWarningModal";

// Mock Category type - replace with your actual type
type Category = {
    _id: string;
    name: string;
    subCategories: Array<{
        _id: string;
        name: string;
        description: string;
    }>;
};

type CategoryRowProps = {
    category: Category;
    openCategoryId: string | null;
    toggleAccordion: (id: string) => void;
};

const CategoryRow: React.FC<CategoryRowProps> = ({
    category,
    openCategoryId,
    toggleAccordion,
}) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const { mutateAsync: deleteCategory } = useDeleteCategory();
    const { mutateAsync: deleteSubCategory } = useDeleteSubCategories();
    const { onOpen } = useModal();

    const confirmDelete = async (): Promise<void> => {
        setIsDeleting(true);
        try {
            await deleteCategory(category._id);
            toast.success("Category deleted successfully!");
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        } finally {
            setIsDeleting(false);
        }
    };
    const confirmDeleteSubs = async (subId: string): Promise<void> => {
        setIsDeleting(true);
        try {
            await deleteSubCategory(subId);
            toast.success("SubCategory deleted successfully!");
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="border border-slate-200 shadow-md rounded-lg mb-2 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="w-full flex items-center justify-between bg-white">
                    <button
                        className="capitalize flex-1 text-left p-4 font-medium transition hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleAccordion(category._id)}
                    >
                        {category.name}
                    </button>

                    <div className="flex items-center pr-4 space-x-2">
                        {/* Delete Button */}
                        <button
                            onClick={() => {
                                onOpen(
                                    <DeletionWarningModal
                                        deleteFunc={confirmDelete}
                                        id={category._id}
                                        item="category"
                                    />
                                );
                            }}
                            className="p-2 cursor-pointer text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            title="Delete category"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() =>
                                onOpen(
                                    <UpdateCategoryForm category={category} />
                                )
                            }
                            className="p-2 cursor-pointer text-gray-400 hover:text-yellow-500 hover:bg-red-50 rounded-full transition-colors"
                            title="Update category"
                        >
                            <Edit className="w-4 h-4" />
                        </button>

                        {/* Accordion Toggle */}
                        <button
                            onClick={() => toggleAccordion(category._id)}
                            className="p-1"
                        >
                            {openCategoryId === category._id ? (
                                <ChevronUp className="text-slate-600 w-5 h-5" />
                            ) : (
                                <ChevronDown className="text-slate-600 w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {openCategoryId === category._id && (
                    <div className="pl-6 pr-4 pb-4 bg-gray-50 border-t border-gray-100">
                        {category.subCategories.length > 0 ? (
                            <div className="space-y-1">
                                {category.subCategories.map((sub) => (
                                    <div
                                        key={sub._id}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="py-2 text-gray-700 flex items-center capitalize">
                                                <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                                                {sub.name}
                                            </div>
                                            <div className="py-2 text-gray-600 italic text-sm">
                                                {sub.description}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    onOpen(
                                                        <ShowAndCreateFields
                                                            id={sub._id}
                                                        />
                                                    );
                                                }}
                                                className="cursor-pointer py-2 px-[18px] mt-2 rounded-[8px] border border-[#333] text-[#333] text-[12px] font-normal bg-[#fff] outline-none hover:bg-[#222] hover:text-[#fff] duration-300"
                                                title="show fields"
                                            >
                                                Show fields
                                            </button>
                                            {/* Delete Button */}
                                            <button
                                                onClick={() =>
                                                    confirmDeleteSubs(sub._id)
                                                }
                                                className="p-2 cursor-pointer text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                title="Delete subcategory"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onOpen(
                                                        <UpdateSubcategoryForm
                                                            subcategory={sub}
                                                        />
                                                    )
                                                }
                                                className="p-2 cursor-pointer text-gray-400 hover:text-yellow-500 hover:bg-red-50 rounded-full transition-colors"
                                                title="Update subcategory"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => {
                                        onOpen(
                                            <CreateSubcategoryForm
                                                parentCategory={{
                                                    name: category.name,
                                                    id: category._id,
                                                }}
                                            />
                                        );
                                    }}
                                    className="cursor-pointer py-2 px-[18px] mt-2 rounded-[8px] bg-[#333] text-[12px] font-normal text-[#fff] outline-none hover:bg-[#222] duration-300"
                                >
                                    Add SubCategories
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-5 py-3">
                                <div className="text-sm text-gray-500 italic py-2">
                                    No subcategories
                                </div>
                                <button
                                    onClick={() => {
                                        onOpen(
                                            <CreateSubcategoryForm
                                                parentCategory={{
                                                    name: category.name,
                                                    id: category._id,
                                                }}
                                            />
                                        );
                                    }}
                                    className="cursor-pointer py-2 px-[18px] rounded-[8px] bg-[#333] text-[12px] font-normal text-[#fff] outline-none hover:bg-[#222] duration-300"
                                >
                                    Add SubCategories
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default CategoryRow;
