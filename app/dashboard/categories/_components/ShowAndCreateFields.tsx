import React, { useState } from "react";
import GridContainer from "@/components/GridContainer";
import useGetSubCategoriesFields from "@/hooks/subCategories/useGetSubCategoriesFields";
import { ClipLoader } from "react-spinners";
import {
    FileText,
    CheckCircle,
    XCircle,
    Settings,
    Plus,
    Edit3,
    X,
} from "lucide-react";
import useCreateSubCategoriesFields from "@/hooks/subCategories/useCreateSubCategoriesFields";
import toast from "react-hot-toast";
import useDeleteSubCategoriesFields from "@/hooks/subCategories/useDeleteSubCategoriesFields";
import useUpdateSubCategoriesFields from "@/hooks/subCategories/useUpdateSubCategoriesFields";

interface CustomField {
    _id: string;
    fieldName: string;
    description: string;
    isRequired: boolean;
}

interface SubcategoryFieldsData {
    subcategoryName: string;
    customFields: CustomField[];
}

interface CreateFieldData {
    fieldName: string;
    description: string;
    isRequired: boolean;
}

const ShowAndCreateFields = ({ id }: { id: string }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingField, setEditingField] = useState<CustomField | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState<CreateFieldData>({
        fieldName: "",
        description: "",
        isRequired: false,
    });

    const {
        data,
        isLoading,
        error,
    }: {
        data: SubcategoryFieldsData | undefined;
        isLoading: boolean;
        error: any;
    } = useGetSubCategoriesFields(id);

    const { mutateAsync: createField } = useCreateSubCategoriesFields(id);
    const { mutateAsync: deleteField } = useDeleteSubCategoriesFields();
    const { mutateAsync: updateField } = useUpdateSubCategoriesFields();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.fieldName.trim() || !formData.description.trim()) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            setIsCreating(true);

            if (editingField) {
                // Update existing field
                await updateField({
                    subCategoryId: id,
                    fieldId: editingField._id,
                    data: formData,
                });
                toast.success("Field updated successfully!");
                setEditingField(null);
            } else {
                // Create new field
                await createField(formData);
                toast.success("Field created successfully!");
            }

            setShowForm(false);
            setFormData({
                fieldName: "",
                description: "",
                isRequired: false,
            });
        } catch (error) {
            console.error(
                `Error ${editingField ? "updating" : "creating"} field:`,
                error
            );
            toast.error(
                `Failed to ${editingField ? "update" : "create"} field`
            );
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteFields = async () => {
        if (!data?.customFields || data.customFields.length === 0) {
            toast.error("No fields to delete");
            return;
        }

        const fieldIds = data.customFields.map((field) => field._id);
        try {
            await Promise.all(
                fieldIds.map((fieldId) =>
                    deleteField({ subCategoryId: id, fieldId })
                )
            );
            toast.success("Fields deleted successfully!");
        } catch (error) {
            console.error("Error deleting fields:", error);
            toast.error("Failed to delete fields");
        }
    };

    const handleDeleteField = async (fieldId: string) => {
        if (!data?.customFields || data.customFields.length === 0) {
            toast.error("No fields to delete");
            return;
        }

        try {
            await deleteField({
                subCategoryId: id,
                fieldId,
            });
            toast.success("Field deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete field");
        }
    };

    const handleEditField = (field: CustomField) => {
        setEditingField(field);
        setFormData({
            fieldName: field.fieldName,
            description: field.description,
            isRequired: field.isRequired,
        });
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingField(null);
        setFormData({
            fieldName: "",
            description: "",
            isRequired: false,
        });
    };

    if (!id) return null;

    if (isLoading) {
        return (
            <GridContainer className="p-6 flex justify-center items-center min-h-[400px]">
                <ClipLoader size={50} />
            </GridContainer>
        );
    }

    if (error) {
        return (
            <GridContainer className="p-6">
                <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
                    <XCircle className="w-8 h-8 mx-auto mb-2" />
                    <p>Error loading fields data</p>
                </div>
            </GridContainer>
        );
    }

    return (
        <div className="p-6 w-2xl mx-auto">
            {/* Header */}
            <div className="bg-[#222] text-white p-6 rounded-t-lg w-full">
                <div className="flex items-center gap-3">
                    <Settings className="w-8 h-8" />
                    <div>
                        <h1 className="text-2xl font-bold">Custom Fields</h1>
                        <p className="text-gray-300">
                            {data?.subcategoryName || "Loading..."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-b-lg shadow-lg w-full">
                {/* Add New Field Button */}
                <div className="p-6 border-b border-gray-200">
                    <button
                        onClick={() => setShowForm(true)}
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#222] text-white rounded-lg hover:bg-[#111] transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Field
                    </button>
                </div>
                {/* Add Field Form Modal */} {/* Fields List */}
                {showForm ? (
                    <div className="p-6 w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">
                                {editingField ? "Edit Field" : "Add New Field"}
                            </h3>
                            <button
                                onClick={handleCancel}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Field Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.fieldName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            fieldName: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., engine_condition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                    placeholder="Describe what this field is for..."
                                    required
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isRequired"
                                    checked={formData.isRequired}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            isRequired: e.target.checked,
                                        })
                                    }
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="isRequired"
                                    className="ml-2 block text-sm text-gray-700"
                                >
                                    This field is required
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="flex-1 bg-[#222] text-white py-2 px-4 rounded-md hover:bg-[#111] transition-colors disabled:opacity-50"
                                >
                                    {isCreating
                                        ? editingField
                                            ? "Updating..."
                                            : "Creating..."
                                        : editingField
                                        ? "Update Field"
                                        : "Create Field"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="p-6 w-full">
                        {!data?.customFields ||
                        data.customFields.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <h3 className="text-lg font-medium mb-2">
                                    No Custom Fields
                                </h3>
                                <p className="text-sm">
                                    No custom fields have been created for this
                                    subcategory yet.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Custom Fields ({data.customFields.length})
                                </h2>

                                {data.customFields.map((field) => (
                                    <div
                                        key={field._id}
                                        className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {field.fieldName
                                                            .replace(/_/g, " ")
                                                            .replace(
                                                                /\b\w/g,
                                                                (l) =>
                                                                    l.toUpperCase()
                                                            )}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        {field.isRequired ? (
                                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                                                <CheckCircle className="w-3 h-3" />
                                                                Required
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                                                <XCircle className="w-3 h-3" />
                                                                Optional
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 text-sm mb-3">
                                                    {field.description}
                                                </p>

                                                <div className="text-xs text-gray-500">
                                                    <span className="font-medium">
                                                        Field ID:
                                                    </span>{" "}
                                                    {field._id}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 ml-4">
                                                <button
                                                    onClick={() =>
                                                        handleEditField(field)
                                                    }
                                                    className="cursor-pointer p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteField(
                                                            field._id
                                                        )
                                                    }
                                                    className="cursor-pointer p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowAndCreateFields;
