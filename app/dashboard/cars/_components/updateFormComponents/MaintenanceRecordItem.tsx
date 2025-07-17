// filepath: c:\Users\NV_USER\Desktop\naqaa-dashboard\app\dashboard\cars\_components\updateFormComponents\MaintenanceRecordItem.tsx
import React from "react";
import { Edit, Save, X, Trash2 } from "lucide-react";
import { formatDate } from "@/utils/helpers";
import DriverSelector from "./DriverSelector";
import Price from "@/components/Price";
import SubCategorySelector from "./SubCategorySelector";
import CustomFieldsSection from "./CustomFieldsSection";

type DriverToApi = {
    _id: string;
    name: string;
    phoneNumber: string;
    nationalId: string;
    licenseNumber: string;
    address?: string;
};

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

type CustomFieldWithValue = {
    fieldName: string;
    fieldValue: string;
    subcategoryId: string;
};

type NM = {
    cost: string;
    date: string;
    mechanicCost: string;
    subCategories: string[];
    driver: string;
    customFieldValues: CustomFieldWithValue[];
};

interface MaintenanceRecordItemProps {
    record: MaintenanceRecord;
    isEditing: boolean;
    editForm: NM;
    onEditFormChange: (field: keyof NM, value: any) => void;
    onStartEdit: () => void;
    onSaveEdit: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    drivers: DriverToApi[];
    subCategories: SubCategory[];
    customFieldValues: CustomFieldWithValue[];
    onCustomFieldValueChange: (
        fieldName: string,
        subcategoryId: string,
        value: string
    ) => void;
    validationErrors: { [key: string]: string | undefined };
}

const MaintenanceRecordItem: React.FC<MaintenanceRecordItemProps> = ({
    record,
    isEditing,
    editForm,
    onEditFormChange,
    onStartEdit,
    onSaveEdit,
    onCancelEdit,
    onDelete,
    drivers,
    subCategories,
    customFieldValues,
    onCustomFieldValueChange,
    validationErrors,
}) => {
    const handleAddDriver = (driverId: string) => {
        onEditFormChange("driver", driverId);
    };

    const handleRemoveDriver = () => {
        onEditFormChange("driver", "");
    };

    const handleAddSubCategory = (subCategoryId: string) => {
        onEditFormChange("subCategories", [
            ...editForm.subCategories,
            subCategoryId,
        ]);
    };

    const handleRemoveSubCategory = (subCategoryId: string) => {
        onEditFormChange(
            "subCategories",
            editForm.subCategories.filter((id) => id !== subCategoryId)
        );
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            {isEditing ? (
                // Edit Mode
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-gray-800 text-lg">
                            Edit Maintenance Record
                        </h4>
                        <div className="flex gap-2">
                            <button
                                onClick={onSaveEdit}
                                className="text-green-600 hover:text-green-800 p-1 flex items-center gap-1"
                            >
                                <Save className="w-4 h-4" />
                                Save
                            </button>
                            <button
                                onClick={onCancelEdit}
                                className="text-gray-600 hover:text-gray-800 p-1 flex items-center gap-1"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Maintenance Cost (Riyal)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={editForm.cost}
                                onChange={(e) =>
                                    onEditFormChange("cost", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mechanic Cost (Riyal)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={editForm.mechanicCost}
                                onChange={(e) =>
                                    onEditFormChange(
                                        "mechanicCost",
                                        e.target.value
                                    )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                max={new Date().toISOString().split("T")[0]}
                                value={editForm.date}
                                onChange={(e) =>
                                    onEditFormChange("date", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Edit Driver Selection */}
                    <DriverSelector
                        drivers={drivers}
                        selectedDriverId={editForm.driver}
                        onAddDriver={handleAddDriver}
                        onRemoveDriver={handleRemoveDriver}
                    />

                    {/* Edit SubCategories Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sub Categories
                        </label>
                        <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                            {subCategories?.map((subCategory: SubCategory) => {
                                const isSelected =
                                    editForm.subCategories.includes(
                                        subCategory._id
                                    );
                                return (
                                    <div
                                        key={subCategory._id}
                                        onClick={() => {
                                            if (isSelected) {
                                                handleRemoveSubCategory(
                                                    subCategory._id
                                                );
                                            } else {
                                                handleAddSubCategory(
                                                    subCategory._id
                                                );
                                            }
                                        }}
                                        className={`rounded-sm ${
                                            isSelected
                                                ? "bg-green-500"
                                                : "bg-gray-100"
                                        } transition-all duration-300 p-3 cursor-pointer`}
                                    >
                                        <span
                                            className={`font-medium text-sm ${
                                                isSelected
                                                    ? "text-white"
                                                    : "text-gray-800"
                                            }`}
                                        >
                                            {subCategory.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Custom Fields Section for Edit */}
                    {editForm.subCategories.length > 0 && (
                        <CustomFieldsSection
                            subcategoryIds={editForm.subCategories}
                            subCategories={subCategories}
                            customFieldValues={customFieldValues}
                            onCustomFieldValueChange={onCustomFieldValueChange}
                            validationErrors={validationErrors}
                            isEdit={true}
                        />
                    )}
                </div>
            ) : (
                // View Mode
                <>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h4 className="font-medium text-gray-800 text-lg capitalize">
                                {record.description}
                            </h4>
                            <p className="text-sm text-gray-600">
                                Driver: {record.driver.name}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={onStartEdit}
                                className="text-blue-600 hover:text-blue-800 p-1"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={onDelete}
                                className="text-red-600 hover:text-red-800 p-1"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                            <span className="font-medium">Cost:</span>{" "}
                            <Price
                                amount={Number(record.cost) || 0}
                                showIcon={true}
                            />
                        </div>
                        <div>
                            <span className="font-medium">Mechanic Cost:</span>{" "}
                            <Price
                                amount={Number(record.mechanicCost) || 0}
                                showIcon={true}
                            />
                        </div>
                        <div>
                            <span className="font-medium">Total Cost:</span>{" "}
                            <Price
                                amount={
                                    Number(record.mechanicCost + record.cost) ||
                                    0
                                }
                                showIcon={true}
                            />
                        </div>
                        <div>
                            <span className="font-medium">Date:</span>{" "}
                            {formatDate(record.date)}
                        </div>
                        <div>
                            <span className="font-medium">Car ID:</span>{" "}
                            {record.car}
                        </div>
                    </div>

                    {record.subCategories.length > 0 && (
                        <div>
                            <h5 className="font-medium text-gray-800 mb-2">
                                Sub Categories:
                            </h5>
                            <div className="space-y-2">
                                {record.subCategories.map((subCat) => (
                                    <div
                                        key={subCat._id}
                                        className="bg-gray-50 p-3 rounded-md"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="font-medium text-gray-800 capitalize">
                                                    {subCat.name}
                                                </span>
                                                <span className="text-gray-600 ml-2 capitalize">
                                                    ({subCat.category.name})
                                                </span>
                                            </div>
                                        </div>
                                        {subCat.description && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                {subCat.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Display Custom Field Values */}
                    {record.customFieldValues &&
                        record.customFieldValues.length > 0 && (
                            <div className="mt-4">
                                <h5 className="font-medium text-gray-800 mb-2">
                                    Custom Field Values:
                                </h5>
                                <div className="grid grid-cols-2 gap-4">
                                    {record.customFieldValues.map(
                                        (fieldValue: CustomFieldWithValue) => (
                                            <div
                                                key={`${fieldValue.fieldName}_${fieldValue.subcategoryId}`}
                                                className="bg-gray-50 p-3 rounded-md"
                                            >
                                                <span className="font-medium text-gray-800">
                                                    {fieldValue.fieldName
                                                        .replace(/_/g, " ")
                                                        .replace(
                                                            /\b\w/g,
                                                            (l: string) =>
                                                                l.toUpperCase()
                                                        )}
                                                    :
                                                </span>
                                                <span className="text-gray-600 ml-2">
                                                    {fieldValue.fieldValue}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                </>
            )}
        </div>
    );
};

export default MaintenanceRecordItem;
