import React, { useState } from "react";
import { Plus, Tag, Loader2, CheckCircle, Folder } from "lucide-react";
import useCreateSubCategories from "@/hooks/subCategories/useCreateSubCategories";

type Props = {
    parentCategory: {
        name: string;
        id: string;
    };
};
const CreateSubcategoryForm = (parentCategory: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [subcategoryName, setSubcategoryName] = useState("");
    const [subcategoryDescription, setSubcategoryDescription] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({ name: "", description: "" });

    const { mutateAsync: createSubcategory } = useCreateSubCategories();

    const handleNameChange = (event: any) => {
        setSubcategoryName(event.target.value);
        if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
        if (showSuccess) setShowSuccess(false);
    };

    const handleDescriptionChange = (event: any) => {
        setSubcategoryDescription(event.target.value);
        if (errors.description)
            setErrors((prev) => ({ ...prev, description: "" }));
        if (showSuccess) setShowSuccess(false);
    };

    const validateForm = () => {
        const newErrors = { name: "", description: "" };
        let isValid = true;

        if (!subcategoryName.trim()) {
            newErrors.name = "Subcategory name is required";
            isValid = false;
        } else if (subcategoryName.trim().length < 2) {
            newErrors.name =
                "Subcategory name must be at least 2 characters long";
            isValid = false;
        }

        if (!subcategoryDescription.trim()) {
            newErrors.description = "Description is required";
            isValid = false;
        } else if (subcategoryDescription.trim().length < 10) {
            newErrors.description =
                "Description must be at least 10 characters long";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setErrors({ name: "", description: "" });

        try {
            setIsLoading(true);
            await createSubcategory({
                name: subcategoryName.trim(),
                description: subcategoryDescription.trim(),
                category: parentCategory.parentCategory.id,
            });

            setSubcategoryName("");
            setSubcategoryDescription("");
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        } catch (error) {
            console.error("Error creating subcategory:", error);
            setErrors((prev) => ({
                ...prev,
                name: "Failed to create subcategory. Please try again.",
            }));
        } finally {
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };

    const isFormValid =
        subcategoryName.trim().length >= 2 &&
        subcategoryDescription.trim().length >= 10;

    return (
        <div className="w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            {/* Header with Back Button */}
            <div className="flex items-center mb-6">
                <div className="flex-1">
                    <h3 className="text-sm text-gray-500">
                        Adding subcategory to
                    </h3>
                    <p className="font-semibold text-gray-900 flex items-center">
                        <Folder className="w-4 h-4 mr-2 text-gray-600" />
                        {parentCategory.parentCategory.name}
                    </p>
                </div>
            </div>

            {/* Main Header */}
            <div className="text-center mb-8">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Tag className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Create Subcategory
                </h2>
                <p className="text-gray-600">
                    Add a subcategory to better organize your items
                </p>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-green-800 font-medium">
                        Subcategory created successfully!
                    </span>
                </div>
            )}

            <div className="space-y-6">
                {/* Subcategory Name */}
                <div>
                    <label
                        htmlFor="subcategoryName"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Subcategory Name *
                    </label>
                    <div className="relative">
                        <input
                            value={subcategoryName}
                            onChange={handleNameChange}
                            type="text"
                            id="subcategoryName"
                            name="subcategoryName"
                            required
                            placeholder="e.g., Smartphones, Laptops, Gaming"
                            className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                errors.name
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        <Plus className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>

                    {/* Name Error */}
                    {errors.name && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2 text-xs">
                                !
                            </span>
                            {errors.name}
                        </p>
                    )}

                    {/* Name Character Count */}
                    <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                            {subcategoryName.length > 0 &&
                                `${subcategoryName.length} characters`}
                        </span>
                        {subcategoryName.length >= 2 && (
                            <span className="text-xs text-green-600 flex items-center">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Good length
                            </span>
                        )}
                    </div>
                </div>

                {/* Subcategory Description */}
                <div>
                    <label
                        htmlFor="subcategoryDescription"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Description *
                    </label>
                    <div className="relative">
                        <textarea
                            value={subcategoryDescription}
                            onChange={handleDescriptionChange}
                            id="subcategoryDescription"
                            name="subcategoryDescription"
                            required
                            rows={4}
                            placeholder="Describe what items belong in this subcategory..."
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                                errors.description
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                    </div>

                    {/* Description Error */}
                    {errors.description && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center mr-2 text-xs">
                                !
                            </span>
                            {errors.description}
                        </p>
                    )}

                    {/* Description Character Count */}
                    <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                            {subcategoryDescription.length > 0 &&
                                `${subcategoryDescription.length} characters (min. 10)`}
                        </span>
                        {subcategoryDescription.length >= 10 && (
                            <span className="text-xs text-green-600 flex items-center">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Good description
                            </span>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || isLoading || !isFormValid}
                    className="w-full cursor-pointer inline-flex items-center justify-center px-6 py-3 bg-blue-600 border border-transparent rounded-lg shadow-sm text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    {isSubmitting || isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            <span>Creating Subcategory...</span>
                        </>
                    ) : (
                        <>
                            <Plus className="w-5 h-5 mr-2" />
                            <span>Create Subcategory</span>
                        </>
                    )}
                </button>
            </div>

            {/* Help Text */}
            <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                    Subcategories help you organize items within{" "}
                    {parentCategory.parentCategory.name}
                </p>
            </div>
        </div>
    );
};

export default CreateSubcategoryForm;
