// filepath: c:\Users\NV_USER\Desktop\naqaa-dashboard\app\dashboard\cars\_components\updateFormComponents\CustomFieldsSection.tsx
import React from "react";

type CustomField = {
    fieldName: string;
    description: string;
    isRequired: boolean;
    _id: string;
};

type CustomFieldWithValue = {
    fieldName: string;
    fieldValue: string;
    subcategoryId: string;
};

type SubCategory = {
    name: string;
    category: {
        _id: string;
        name: string;
    };
    customFields?: CustomField[];
    description: string;
    _id: string;
};

interface CustomFieldsSectionProps {
    subcategoryIds: string[];
    subCategories: SubCategory[];
    customFieldValues: CustomFieldWithValue[];
    onCustomFieldValueChange: (fieldName: string, subcategoryId: string, value: string) => void;
    validationErrors: { [key: string]: string | undefined };
    isEdit?: boolean;
}

const CustomFieldsSection: React.FC<CustomFieldsSectionProps> = ({
    subcategoryIds,
    subCategories,
    customFieldValues,
    onCustomFieldValueChange,
    validationErrors,
    isEdit = false
}) => {
    // Get custom fields for selected subcategories
    const getCustomFieldsForSubcategories = (subcategoryIds: string[]) => {
        const fields: Array<CustomField & { subcategoryId: string }> = [];
        subcategoryIds.forEach(subId => {
            const subcategory = subCategories.find((sub: SubCategory) => sub._id === subId);
            if (subcategory && subcategory.customFields) {
                subcategory.customFields.forEach((field: CustomField) => {
                    fields.push({ ...field, subcategoryId: subId });
                });
            }
        });
        return fields;
    };

    const customFields = getCustomFieldsForSubcategories(subcategoryIds);

    if (customFields.length === 0) return null;

    return (
        <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-800">Custom Fields</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customFields.map((field) => {
                    const currentValue = customFieldValues.find(
                        v => v.fieldName === field.fieldName && v.subcategoryId === field.subcategoryId
                    )?.fieldValue || '';
                    
                    const errorKey = `customField_${field.fieldName}_${field.subcategoryId}`;
                    const hasError = validationErrors[errorKey];

                    return (
                        <div key={`${field.fieldName}_${field.subcategoryId}`}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.fieldName.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                {field.isRequired && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            <input
                                type="text"
                                value={currentValue}
                                onChange={(e) => onCustomFieldValueChange(field.fieldName, field.subcategoryId, e.target.value)}
                                placeholder={field.description || `Enter ${field.fieldName.replace(/_/g, ' ')}`}
                                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    hasError ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {hasError && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors[errorKey]}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CustomFieldsSection;
