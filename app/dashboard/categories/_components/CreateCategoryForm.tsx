import useCreateCategory from "@/hooks/categories/useCreateCategory";
import React, { useState } from "react";

const CreateCategoryForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const { mutateAsync: createCategory } = useCreateCategory();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value);
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            setIsLoading(true);
            const data = await createCategory({ data: { name: categoryName } });
            console.log(data);

            setCategoryName("");
        } catch (error) {
            console.error("Error creating category:", error);
        } finally {
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
                <label
                    htmlFor="categoryName"
                    className="block text-sm font-medium text-gray-700"
                >
                    Category Name
                </label>
                <input
                    value={categoryName}
                    onChange={handleChange}
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#222] border border-transparent rounded-md shadow-sm text-white font-medium hover:bg-[#111] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            >
                {isSubmitting || isLoading ? (
                    <span>Creating...</span>
                ) : (
                    <span>Create Category</span>
                )}
            </button>
        </form>
    );
};

export default CreateCategoryForm;
