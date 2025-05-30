import React, { useState } from "react";
import { Plus, Tag, Loader2, CheckCircle } from "lucide-react";
import useCreateCategory from "@/hooks/categories/useCreateCategory";

const CreateCategoryForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categoryName, setCategoryName] = useState<string>("");
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const { mutateAsync: createCategory } = useCreateCategory();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setCategoryName(event.target.value);
        if (error) setError(""); // Clear error when user starts typing
        if (showSuccess) setShowSuccess(false); // Clear success when user starts typing again
    };

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        // Basic validation
        if (!categoryName.trim()) {
            setError("Category name is required");
            return;
        }

        if (categoryName.trim().length < 2) {
            setError("Category name must be at least 2 characters long");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            setIsLoading(true);
            const data = await createCategory({
                data: { name: categoryName.trim() },
            });
            console.log(data);

            setCategoryName("");
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error("Error creating category:", error);
            setError("Failed to create category. Please try again.");
        } finally {
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Tag className="w-8 h-8 text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Create New Category
                </h2>
                <p className="text-gray-600">
                    Add a new category to organize your items
                </p>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-800 font-medium">
                        Category created successfully!
                    </span>
                </div>
            )}

            <div className="space-y-6">
                <div>
                    <label
                        htmlFor="categoryName"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Category Name
                    </label>
                    <div className="relative">
                        <input
                            value={categoryName}
                            onChange={handleChange}
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            required
                            placeholder="Enter category name"
                            className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors ${
                                error
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        <Plus className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2">
                                !
                            </span>
                            {error}
                        </p>
                    )}

                    {/* Character Count */}
                    <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                            {categoryName.length > 0 &&
                                `${categoryName.length} characters`}
                        </span>
                        {categoryName.length >= 2 && (
                            <span className="text-xs text-green-600 flex items-center">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Looks good
                            </span>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || isLoading || !categoryName.trim()}
                    className="w-full cursor-pointer inline-flex items-center justify-center px-6 py-3 bg-[#222] border border-transparent rounded-lg shadow-sm text-white font-semibold hover:bg-[#111] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    {isSubmitting || isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            <span>Creating Category...</span>
                        </>
                    ) : (
                        <>
                            <Plus className="w-5 h-5 mr-2" />
                            <span>Create Category</span>
                        </>
                    )}
                </button>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                    Category names should be descriptive and easy to remember
                </p>
            </div>
        </div>
    );
};

export default CreateCategoryForm;
