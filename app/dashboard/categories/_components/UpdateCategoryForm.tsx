import React, { useState } from "react";
import { Edit, Loader2, CheckCircle } from "lucide-react";
import useUpdateCategory from "@/hooks/categories/useUpdateCategory";
import { useModal } from "@/store/useModal";
import toast from "react-hot-toast";

type Category = {
    _id: string;
    name: string;
};

type UpdateCategoryFormProps = {
    category: Category;
};

const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({
    category,
}) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [categoryName, setCategoryName] = useState<string>(category.name);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [errors, setErrors] = useState({ name: "" });

    const { mutateAsync: updateCategory } = useUpdateCategory();
    const { onClose } = useModal();

    const handleNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setCategoryName(event.target.value);
        if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
        if (showSuccess) setShowSuccess(false);
    };

    const validateForm = () => {
        const newErrors = { name: "" };
        let isValid = true;

        if (!categoryName.trim()) {
            newErrors.name = "Category name is required";
            isValid = false;
        } else if (categoryName.trim().length < 2) {
            newErrors.name = "Category name must be at least 2 characters long";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            await updateCategory({
                id: category._id,
                data: { name: categoryName.trim() },
            });

            setShowSuccess(true);
            toast.success("Category updated successfully!");

            // Close modal after a brief delay
            setTimeout(() => {
                onClose();
            }, 400);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to update category"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            {/* Header */}
            <div className="flex items-center bg-[#222] text-white p-4 rounded-lg mb-6">
                <Edit className="w-6 h-6 text-white mr-3" />
                <h2 className="text-xl font-bold text-white">
                    Update Category
                </h2>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-700 font-medium">
                        Category updated successfully!
                    </span>
                </div>
            )}

            <div className="space-y-6">
                {/* Category Name */}
                <div>
                    <label
                        htmlFor="categoryName"
                        className="flex items-center text-sm font-semibold text-gray-700 mb-2"
                    >
                        <Edit className="w-4 h-4 mr-2 text-gray-500" />
                        Category Name
                    </label>
                    <input
                        value={categoryName}
                        onChange={handleNameChange}
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        required
                        placeholder="Enter category name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.name
                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300"
                        }`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || showSuccess}
                        className="flex-1 bg-[#222] text-white py-3 px-4 rounded-lg hover:bg-[#111] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Updating...
                            </>
                        ) : showSuccess ? (
                            <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Updated!
                            </>
                        ) : (
                            <>
                                <Edit className="w-4 h-4 mr-2" />
                                Update Category
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategoryForm;
