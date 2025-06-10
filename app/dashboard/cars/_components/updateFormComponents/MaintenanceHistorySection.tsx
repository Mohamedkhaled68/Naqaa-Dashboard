// filepath: c:\Users\NV_USER\Desktop\naqaa-dashboard\app\dashboard\cars\_components\updateFormComponents\MaintenanceHistorySection.tsx
import useCreateMaintenanceRecord from "@/hooks/maintenance/useCreateMaintenanceRecord";
import useDeleteMaintenanceRecord from "@/hooks/maintenance/useDeleteMaintenanceRecord";
import useUpdateMaintenanceRecord from "@/hooks/maintenance/useUpdateMaintenanceRecord";
import useGetSubCategories from "@/hooks/subCategories/useGetSubCategories";
import { Wrench } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import AddMaintenanceForm from "./AddMaintenanceForm";
import MaintenanceRecordItem from "./MaintenanceRecordItem";

type DriverToApi = {
    _id: string;
    name: string;
    phoneNumber: string;
    nationalId: string;
    licenseNumber: string;
    address: string;
};

type CustomField = {
    fieldName: string;
    description: string;
    isRequired: boolean;
    _id: string;
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

type MaintenanceHistorySectionProps = {
    newMaintenance: NM;
    setNewMaintenance: React.Dispatch<React.SetStateAction<NM>>;
    setCar: (car: Car) => void;
    car: Car;
};

type ValidationErrors = {
    cost?: string;
    mechanicCost?: string;
    date?: string;
    driver?: string;
    subCategories?: string;
    [key: string]: string | undefined;
};

const MaintenanceHistorySection = ({
    newMaintenance,
    setNewMaintenance,
    setCar,
    car,
}: MaintenanceHistorySectionProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {}
    );
    const [editingRecord, setEditingRecord] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<NM>({
        cost: "",
        date: "",
        mechanicCost: "",
        subCategories: [],
        driver: "",
        customFieldValues: [],
    });

    // Add state for custom field values
    const [customFieldValues, setCustomFieldValues] = useState<
        CustomFieldWithValue[]
    >([]);
    const [editCustomFieldValues, setEditCustomFieldValues] = useState<
        CustomFieldWithValue[]
    >([]);

    const { data: subCategories = [], isLoading } = useGetSubCategories();
    const { mutateAsync: createMaintenanceRecord } =
        useCreateMaintenanceRecord();
    const { mutateAsync: deleteMaintenanceRecord } =
        useDeleteMaintenanceRecord();
    const { mutateAsync: updateMaintenanceRecord } =
        useUpdateMaintenanceRecord();

    // Get custom fields for selected subcategories
    const getCustomFieldsForSubcategories = (subcategoryIds: string[]) => {
        const fields: Array<CustomField & { subcategoryId: string }> = [];
        subcategoryIds.forEach((subId) => {
            const subcategory = subCategories.find(
                (sub: SubCategory) => sub._id === subId
            );
            if (subcategory && subcategory.customFields) {
                subcategory.customFields.forEach((field: CustomField) => {
                    fields.push({ ...field, subcategoryId: subId });
                });
            }
        });
        return fields;
    };

    // Handle custom field value changes
    const handleCustomFieldValueChange = (
        fieldName: string,
        subcategoryId: string,
        value: string,
        isEdit = false
    ) => {
        const setter = isEdit ? setEditCustomFieldValues : setCustomFieldValues;

        setter((prev) => {
            const existing = prev.find(
                (f) =>
                    f.fieldName === fieldName &&
                    f.subcategoryId === subcategoryId
            );
            if (existing) {
                return prev.map((f) =>
                    f.fieldName === fieldName &&
                    f.subcategoryId === subcategoryId
                        ? { ...f, fieldValue: value }
                        : f
                );
            } else {
                return [
                    ...prev,
                    { fieldName, fieldValue: value, subcategoryId },
                ];
            }
        });
    };

    // Input validation function
    const validateForm = (maintenance: NM): ValidationErrors => {
        const errors: ValidationErrors = {};

        if (!maintenance.cost || parseFloat(maintenance.cost) < 0) {
            errors.cost = "Maintenance cost is required and must be positive";
        }

        if (
            !maintenance.mechanicCost ||
            parseFloat(maintenance.mechanicCost) < 0
        ) {
            errors.mechanicCost =
                "Mechanic cost is required and must be positive";
        }

        if (!maintenance.date) {
            errors.date = "Date is required";
        } else {
            const selectedDate = new Date(maintenance.date);
            const today = new Date();
            if (selectedDate > today) {
                errors.date = "Date cannot be in the future";
            }
        }

        if (!maintenance.driver) {
            errors.driver = "Driver selection is required";
        }

        if (maintenance.subCategories.length === 0) {
            errors.subCategories = "At least one sub-category must be selected";
        }

        return errors;
    };

    // Handle input changes with validation
    const handleInputChange = (
        field: keyof ValidationErrors,
        value: string
    ) => {
        setNewMaintenance((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear validation error for this field
        if (validationErrors[field]) {
            setValidationErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    const handleAddDriver = (driverId: string) => {
        setNewMaintenance((prev) => ({
            ...prev,
            driver: driverId,
        }));

        // Clear driver validation error
        if (validationErrors.driver) {
            setValidationErrors((prev) => ({
                ...prev,
                driver: undefined,
            }));
        }
    };

    const handleRemoveDriver = () => {
        setNewMaintenance((prev) => ({
            ...prev,
            driver: "",
        }));
    };

    const handleAddSubCategory = (subCategoryId: string) => {
        setNewMaintenance((prev) => ({
            ...prev,
            subCategories: [...prev.subCategories, subCategoryId],
        }));

        // Initialize custom field values for this subcategory
        const subcategory = subCategories.find(
            (sub: SubCategory) => sub._id === subCategoryId
        );
        if (subcategory && subcategory.customFields) {
            subcategory.customFields.forEach((field: CustomField) => {
                setCustomFieldValues((prev) => {
                    const exists = prev.find(
                        (f) =>
                            f.fieldName === field.fieldName &&
                            f.subcategoryId === subCategoryId
                    );
                    if (!exists) {
                        return [
                            ...prev,
                            {
                                fieldName: field.fieldName,
                                fieldValue: "",
                                subcategoryId: subCategoryId,
                            },
                        ];
                    }
                    return prev;
                });
            });
        }

        // Clear subcategories validation error
        if (validationErrors.subCategories) {
            setValidationErrors((prev) => ({
                ...prev,
                subCategories: undefined,
            }));
        }
    };

    const handleRemoveSubCategory = (subCategoryId: string) => {
        setNewMaintenance((prev) => ({
            ...prev,
            subCategories: prev.subCategories.filter(
                (sub) => sub !== subCategoryId
            ),
        }));

        // Remove custom field values for this subcategory
        setCustomFieldValues((prev) =>
            prev.filter((f) => f.subcategoryId !== subCategoryId)
        );
    };

    const handleAddMaintenance = async () => {
        const errors = validateForm(newMaintenance);

        // Validate custom fields
        const customFields = getCustomFieldsForSubcategories(
            newMaintenance.subCategories
        );
        const requiredFields = customFields.filter((field) => field.isRequired);

        requiredFields.forEach((field) => {
            const value = customFieldValues.find(
                (v) =>
                    v.fieldName === field.fieldName &&
                    v.subcategoryId === field.subcategoryId
            );
            if (!value || !value.fieldValue.trim()) {
                errors[
                    `customField_${field.fieldName}_${field.subcategoryId}`
                ] = `${field.fieldName.replace(/_/g, " ")} is required`;
            }
        });

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        if (car.driver.length > 0) {
            function getDescriptionsString(
                subcategoriesId: string[],
                subcategories: SubCategory[]
            ) {
                return subcategories
                    .filter((subcat) => subcategoriesId.includes(subcat._id))
                    .map((subcat) => subcat.description)
                    .join(" - ");
            }

            function convertToISOStringWithCurrentTime(dateStr: string) {
                const now = new Date();
                const [year, month, day] = dateStr.split("-").map(Number);

                const fullDate = new Date(
                    Date.UTC(
                        year,
                        month - 1,
                        day,
                        now.getUTCHours(),
                        now.getUTCMinutes(),
                        now.getUTCSeconds(),
                        now.getUTCMilliseconds()
                    )
                );

                return fullDate.toISOString();
            }

            const description = getDescriptionsString(
                newMaintenance.subCategories,
                subCategories
            );

            try {
                const { data: maintenanceRecordRes } =
                    await createMaintenanceRecord({
                        ...newMaintenance,
                        car: car._id,
                        description,
                        date: convertToISOStringWithCurrentTime(
                            newMaintenance.date
                        ),
                        customFieldData: customFieldValues.filter(
                            (f) => f.fieldValue.trim() !== ""
                        ),
                    });

                setCar({
                    ...car,
                    maintenanceHistory: [
                        ...car.maintenanceHistory,
                        { ...maintenanceRecordRes, car: car._id },
                    ],
                }); // Reset form
                setNewMaintenance({
                    cost: "",
                    mechanicCost: "",
                    date: "",
                    subCategories: [],
                    driver: "",
                    customFieldValues: [],
                });
                setCustomFieldValues([]);
                setValidationErrors({});
                toast.success("Maintenance record added successfully!");
            } catch (error) {
                console.error("Failed to create maintenance record:", error);
                toast.error("Failed to create maintenance record");
            }
        }
    };

    const handleEditRecord = (record: MaintenanceRecord) => {
        setEditingRecord(record._id);
        setEditForm({
            cost: String(record.cost),
            mechanicCost: String(record.mechanicCost),
            date: record.date.split("T")[0],
            driver: record.driver._id,
            subCategories: record.subCategories.map((sub) => sub._id),
            customFieldValues: record.customFieldValues || [],
        });
        setEditCustomFieldValues(record.customFieldValues || []);
    };

    const handleUpdateRecord = async (recordId: string) => {
        const errors = validateForm(editForm);

        // Validate edit custom fields
        const customFields = getCustomFieldsForSubcategories(
            editForm.subCategories
        );
        const requiredFields = customFields.filter((field) => field.isRequired);

        requiredFields.forEach((field) => {
            const value = editCustomFieldValues.find(
                (v) =>
                    v.fieldName === field.fieldName &&
                    v.subcategoryId === field.subcategoryId
            );
            if (!value || !value.fieldValue.trim()) {
                errors[
                    `customField_${field.fieldName}_${field.subcategoryId}`
                ] = `${field.fieldName.replace(/_/g, " ")} is required`;
            }
        });

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        function getDescriptionsString(
            subcategoriesId: string[],
            subcategories: SubCategory[]
        ) {
            return subcategories
                .filter((subcat) => subcategoriesId.includes(subcat._id))
                .map((subcat) => subcat.description)
                .join(" - ");
        }

        function convertToISOStringWithCurrentTime(dateStr: string) {
            const now = new Date();
            const [year, month, day] = dateStr.split("-").map(Number);

            const fullDate = new Date(
                Date.UTC(
                    year,
                    month - 1,
                    day,
                    now.getUTCHours(),
                    now.getUTCMinutes(),
                    now.getUTCSeconds(),
                    now.getUTCMilliseconds()
                )
            );

            return fullDate.toISOString();
        }

        const description = getDescriptionsString(
            editForm.subCategories,
            subCategories
        );

        try {
            const { data: updatedRecord } = await updateMaintenanceRecord({
                id: recordId,
                data: {
                    ...editForm,
                    cost: parseFloat(editForm.cost) || 0,
                    mechanicCost: parseFloat(editForm.mechanicCost) || 0,
                    car: car._id,
                    description,
                    date: convertToISOStringWithCurrentTime(editForm.date),
                    customFieldData: editCustomFieldValues.filter(
                        (f) => f.fieldValue.trim() !== ""
                    ),
                },
            });

            setCar({
                ...car,
                maintenanceHistory: car.maintenanceHistory.map((record) =>
                    record._id === recordId
                        ? { ...updatedRecord, car: car._id }
                        : record
                ),
            });

            setEditingRecord(null);
            setEditCustomFieldValues([]);
            setValidationErrors({});
            toast.success("Maintenance record updated successfully!");
        } catch (error) {
            console.error("Failed to update maintenance record:", error);
            toast.error("Failed to update maintenance record");
        }
    };

    const handleCancelEdit = () => {
        setEditingRecord(null);
        setValidationErrors({});
    };

    const handleRemoveMaintenance = async (id: string) => {
        try {
            await deleteMaintenanceRecord(id);
            setCar({
                ...car,
                maintenanceHistory: car.maintenanceHistory.filter(
                    (item) => item._id !== id
                ),
            });
            toast.success("Maintenance record deleted successfully!");
        } catch (error) {
            console.error("Failed to delete maintenance record:", error);
            toast.error("Failed to delete maintenance record");
        }
    };

    const handleEditFormChange = (field: keyof NM, value: any) => {
        setEditForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-5 h-5 text-[#111]" />
                <h2 className="text-xl font-semibold text-gray-800">
                    Maintenance History
                </h2>
            </div>

            {/* Add New Maintenance */}
            <AddMaintenanceForm
                newMaintenance={newMaintenance}
                onInputChange={handleInputChange}
                drivers={car.driver}
                onAddDriver={handleAddDriver}
                onRemoveDriver={handleRemoveDriver}
                subCategories={subCategories}
                onAddSubCategory={handleAddSubCategory}
                onRemoveSubCategory={handleRemoveSubCategory}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                isLoading={isLoading}
                customFieldValues={customFieldValues}
                onCustomFieldValueChange={(fieldName, subcategoryId, value) =>
                    handleCustomFieldValueChange(
                        fieldName,
                        subcategoryId,
                        value,
                        false
                    )
                }
                validationErrors={validationErrors}
                onSubmit={handleAddMaintenance}
            />

            {/* Existing Maintenance Records */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">
                    Existing Records
                </h3>
                {car.maintenanceHistory.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        No maintenance records found.
                    </p>
                ) : (
                    car.maintenanceHistory.map((record) => (
                        <MaintenanceRecordItem
                            key={record._id}
                            record={record}
                            isEditing={editingRecord === record._id}
                            editForm={editForm}
                            onEditFormChange={handleEditFormChange}
                            onStartEdit={() => handleEditRecord(record)}
                            onSaveEdit={() => handleUpdateRecord(record._id)}
                            onCancelEdit={handleCancelEdit}
                            onDelete={() => handleRemoveMaintenance(record._id)}
                            drivers={car.driver}
                            subCategories={subCategories}
                            customFieldValues={editCustomFieldValues}
                            onCustomFieldValueChange={(
                                fieldName,
                                subcategoryId,
                                value
                            ) =>
                                handleCustomFieldValueChange(
                                    fieldName,
                                    subcategoryId,
                                    value,
                                    true
                                )
                            }
                            validationErrors={validationErrors}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MaintenanceHistorySection;
