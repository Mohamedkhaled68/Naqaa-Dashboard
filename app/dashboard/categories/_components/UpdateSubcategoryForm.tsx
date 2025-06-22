import React, { useState } from "react";
import { Plus, Tag, Loader2, CheckCircle, Folder, Edit3 } from "lucide-react";
import useUpdateSubCategories from "@/hooks/subCategories/useUpdateSubCategories";
import { useModal } from "@/store/useModal";
import toast from "react-hot-toast";

type Props = {
    subcategory: {
        _id: string;
        name: string;
        description: string;
    };
};

const UpdateSubcategoryForm = ({ subcategory }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subcategoryName, setSubcategoryName] = useState(subcategory.name);
    const [subcategoryDescription, setSubcategoryDescription] = useState(
        subcategory.description
    );
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({ name: "", description: "" });

    const { mutateAsync: updateSubcategory } = useUpdateSubCategories();
    const { onClose } = useModal();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubcategoryName(event.target.value);
        if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
        if (showSuccess) setShowSuccess(false);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
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

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await updateSubcategory({
                id: subcategory._id,
                name: subcategoryName.trim(),
                description: subcategoryDescription.trim(),
            });

            setShowSuccess(true);
            toast.success("Subcategory updated successfully!");

            // Close modal after a brief delay
            setTimeout(() => {
                onClose();
            }, 400);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to update subcategory"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#222] px-6 py-4">
                <div className="flex items-center">
                    <Edit3 className="w-6 h-6 text-white mr-3" />
                    <h2 className="text-xl font-bold text-white">
                        Update Subcategory
                    </h2>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Success Message */}
                {showSuccess && (
                    <div className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-green-700 font-medium">
                            Subcategory updated successfully!
                        </span>
                    </div>
                )}

                {/* Subcategory Name Input */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Tag className="w-4 h-4 mr-2 text-gray-500" />
                        Subcategory Name
                    </label>
                    <input
                        type="text"
                        value={subcategoryName}
                        onChange={handleNameChange}
                        placeholder="Enter subcategory name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                            errors.name
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                        }`}
                        disabled={isSubmitting}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Subcategory Description Input */}
                <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Folder className="w-4 h-4 mr-2 text-gray-500" />
                        Description
                    </label>
                    <textarea
                        value={subcategoryDescription}
                        onChange={handleDescriptionChange}
                        placeholder="Enter subcategory description"
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                            errors.description
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                        }`}
                        disabled={isSubmitting}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || showSuccess}
                        className="flex-1 bg-[#222] text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                                <Edit3 className="w-4 h-4 mr-2" />
                                Update Subcategory
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateSubcategoryForm;
