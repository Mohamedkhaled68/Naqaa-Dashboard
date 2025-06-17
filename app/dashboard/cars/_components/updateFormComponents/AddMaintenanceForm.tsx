// filepath: c:\Users\NV_USER\Desktop\naqaa-dashboard\app\dashboard\cars\_components\updateFormComponents\AddMaintenanceForm.tsx
import React from "react";
import { Plus } from "lucide-react";
import DriverSelector from "./DriverSelector";
import SubCategorySelector from "./SubCategorySelector";
import CustomFieldsSection from "./CustomFieldsSection";
import { error } from "console";

type DriverToApi = {
    _id: string;
    name: string;
    phoneNumber: string;
    nationalId: string;
    licenseNumber: string;
    address: string;
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

type ValidationErrors = {
    cost?: string;
    mechanicCost?: string;
    date?: string;
    driver?: string;
    subCategories?: string;
    [key: string]: string | undefined;
};

interface AddMaintenanceFormProps {
    newMaintenance: NM;
    onInputChange: (field: keyof ValidationErrors, value: string) => void;
    drivers: DriverToApi[];
    onAddDriver: (driverId: string) => void;
    onRemoveDriver: () => void;
    subCategories: SubCategory[];
    onAddSubCategory: (subCategoryId: string) => void;
    onRemoveSubCategory: (subCategoryId: string) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    isLoading: boolean;
    customFieldValues: CustomFieldWithValue[];
    onCustomFieldValueChange: (
        fieldName: string,
        subcategoryId: string,
        value: string
    ) => void;
    validationErrors: ValidationErrors;
    onSubmit: () => void;
}

const AddMaintenanceForm: React.FC<AddMaintenanceFormProps> = ({
    newMaintenance,
    onInputChange,
    drivers,
    onAddDriver,
    onRemoveDriver,
    subCategories,
    onAddSubCategory,
    onRemoveSubCategory,
    searchTerm,
    onSearchChange,
    isLoading,
    customFieldValues,
    onCustomFieldValueChange,
    validationErrors,
    onSubmit,
}) => {
    console.log(validationErrors);
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Maintenance Record
            </h3>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mechanic Cost ($) *
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={newMaintenance.mechanicCost}
                            onChange={(e) =>
                                onInputChange("mechanicCost", e.target.value)
                            }
                            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                validationErrors.mechanicCost
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            placeholder="Enter mechanic cost"
                        />
                        {validationErrors.mechanicCost && (
                            <p className="text-red-500 text-sm mt-1">
                                {validationErrors.mechanicCost}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Maintenance Cost ($) *
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={newMaintenance.cost}
                            onChange={(e) =>
                                onInputChange("cost", e.target.value)
                            }
                            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                validationErrors.cost
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            placeholder="Enter maintenance cost"
                        />
                        {validationErrors.cost && (
                            <p className="text-red-500 text-sm mt-1">
                                {validationErrors.cost}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date *
                        </label>
                        <input
                            type="date"
                            max={new Date().toISOString().split("T")[0]}
                            value={newMaintenance.date}
                            onChange={(e) =>
                                onInputChange("date", e.target.value)
                            }
                            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                validationErrors.date
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {validationErrors.date && (
                            <p className="text-red-500 text-sm mt-1">
                                {validationErrors.date}
                            </p>
                        )}
                    </div>
                </div>

                {/* Drivers */}
                <DriverSelector
                    drivers={drivers}
                    selectedDriverId={newMaintenance.driver}
                    onAddDriver={onAddDriver}
                    onRemoveDriver={onRemoveDriver}
                    validationError={validationErrors.driver}
                />

                {/* Sub Categories */}
                <SubCategorySelector
                    subCategories={subCategories}
                    selectedSubCategoryIds={newMaintenance.subCategories}
                    onAddSubCategory={onAddSubCategory}
                    onRemoveSubCategory={onRemoveSubCategory}
                    searchTerm={searchTerm}
                    onSearchChange={onSearchChange}
                    isLoading={isLoading}
                    validationError={validationErrors.subCategories}
                />

                {/* Custom Fields Section */}
                {newMaintenance.subCategories.length > 0 && (
                    <CustomFieldsSection
                        subcategoryIds={newMaintenance.subCategories}
                        subCategories={subCategories}
                        customFieldValues={customFieldValues}
                        onCustomFieldValueChange={onCustomFieldValueChange}
                        validationErrors={validationErrors}
                    />
                )}

                <button
                    onClick={onSubmit}
                    disabled={
                        Object.keys(validationErrors).length > 0 &&
                        Object.values(validationErrors).some(
                            (error) => error !== undefined
                        )
                    }
                    className={`cursor-pointer mt-4 px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                        Object.keys(validationErrors).length > 0 &&
                        Object.values(validationErrors).some(
                            (error) => error !== undefined
                        )
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                >
                    <Plus className="w-4 h-4" />
                    Add Maintenance Record
                </button>
            </div>
        </div>
    );
};

export default AddMaintenanceForm;
