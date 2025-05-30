import useCreateMaintenanceRecord from "@/hooks/maintenance/useCreateMaintenanceRecord";
import useDeleteMaintenanceRecord from "@/hooks/maintenance/useDeleteMaintenanceRecord";
import useUpdateMaintenanceRecord from "@/hooks/maintenance/useUpdateMaintenanceRecord"; // Add this hook
import useGetSubCategories from "@/hooks/subCategories/useGetSubCategories";
import { Minus, Plus, Trash2, Wrench, Edit, Save, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    description: string;
    _id: string;
};

type NM = {
    cost: string;
    date: string;
    mechanicCost: string;
    subCategories: string[];
    driver: string;
};

type MaintenanceRecord = {
    _id: string;
    cost: number | string;
    mechanicCost: number | string;
    date: string;
    description: string;
    driver: DriverToApi;
    subCategories: SubCategory[];
    car: string;
};

type MaintenanceHistorySectionprops = {
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
};

const MaintenanceHistorySection = ({
    newMaintenance,
    setNewMaintenance,
    setCar,
    car,
}: MaintenanceHistorySectionprops) => {
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
    });

    const { data: subCategories } = useGetSubCategories();
    const { mutateAsync: createMaintenanceRecord } =
        useCreateMaintenanceRecord();
    const { mutateAsync: deleteMaintenanceRecord } =
        useDeleteMaintenanceRecord();
    const { mutateAsync: updateMaintenanceRecord } =
        useUpdateMaintenanceRecord(); // Add this

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
    const handleInputChange = (field: keyof NM, value: string) => {
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
    };

    const handleAddMaintenance = async () => {
        const errors = validateForm(newMaintenance);

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
                    });

                setCar({
                    ...car,
                    maintenanceHistory: [
                        ...car.maintenanceHistory,
                        { ...maintenanceRecordRes, car: car._id },
                    ],
                });

                // Reset form
                setNewMaintenance({
                    cost: "",
                    mechanicCost: "",
                    date: "",
                    subCategories: [],
                    driver: "",
                });
                setValidationErrors({});
            } catch (error) {
                console.error("Failed to create maintenance record:", error);
            }
        }
    };

    const handleEditRecord = (record: MaintenanceRecord) => {
        setEditingRecord(record._id);
        setEditForm({
            cost: String(record.cost),
            mechanicCost: String(record.mechanicCost),
            date: record.date.split("T")[0], // Extract date part
            driver: record.driver._id,
            subCategories: record.subCategories.map((sub) => sub._id),
        });
    };

    const handleUpdateRecord = async (recordId: string) => {
        const errors = validateForm(editForm);

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
            setValidationErrors({});
        } catch (error) {
            toast.error("Failed to update maintenance record");
        }
    };

    const handleCancelEdit = () => {
        setEditingRecord(null);
        setValidationErrors({});
    };

    const handleRemoveMaintenance = async (id: string) => {
        setCar({
            ...car,
            maintenanceHistory: car.maintenanceHistory.filter(
                (item) => item._id !== id
            ),
        });

        await deleteMaintenanceRecord(id);
    };

    // Filter subcategories based on search term
    const filteredSubCategories = subCategories?.filter(
        (subCategory: SubCategory) =>
            subCategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subCategory.category.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            subCategory.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-5 h-5 text-[#111]" />
                <h2 className="text-xl font-semibold text-gray-800">
                    Maintenance History
                </h2>
            </div>

            {/* Add New Maintenance */}
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
                                    handleInputChange(
                                        "mechanicCost",
                                        e.target.value
                                    )
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
                                    handleInputChange("cost", e.target.value)
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
                                    handleInputChange("date", e.target.value)
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
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Drivers *
                            </label>
                        </div>
                        {validationErrors.driver && (
                            <p className="text-red-500 text-sm mb-2">
                                {validationErrors.driver}
                            </p>
                        )}

                        <div className="grid grid-cols-3 gap-5">
                            {car.driver?.length > 0 ? (
                                car.driver?.map((driver: DriverToApi) => {
                                    const isSelected =
                                        newMaintenance.driver === driver._id;
                                    return (
                                        <div
                                            key={driver._id}
                                            className={`rounded-sm ${
                                                isSelected
                                                    ? "bg-green-500"
                                                    : "bg-white"
                                            } transition-all duration-300 shadow-md p-4 flex justify-between items-center ${
                                                validationErrors.driver
                                                    ? "ring-2 ring-red-200"
                                                    : ""
                                            }`}
                                        >
                                            <div className="flex flex-col">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span
                                                            className={`font-medium ${
                                                                isSelected
                                                                    ? "text-white"
                                                                    : "text-gray-800"
                                                            }`}
                                                        >
                                                            {driver.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p
                                                    className={`text-sm ${
                                                        isSelected
                                                            ? "text-white"
                                                            : "text-gray-600"
                                                    } mt-1`}
                                                >
                                                    {driver.licenseNumber}
                                                </p>
                                            </div>
                                            {isSelected ? (
                                                <Minus
                                                    onClick={() =>
                                                        handleRemoveDriver()
                                                    }
                                                    className="hover:bg-black/10 text-white transition-all duration-300 rounded-full p-1 w-[28px] h-[28px] cursor-pointer"
                                                />
                                            ) : (
                                                <Plus
                                                    onClick={() =>
                                                        handleAddDriver(
                                                            driver._id
                                                        )
                                                    }
                                                    className="hover:bg-slate-200 transition-all duration-300 rounded-full p-1 w-[28px] h-[28px] cursor-pointer"
                                                />
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-500 text-center py-8 col-span-3">
                                    No drivers assigned to this car.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Sub Categories */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Sub Categories *
                            </label>
                            <input
                                onChange={(e) =>
                                    setSearchTerm(e.target.value.trim())
                                }
                                value={searchTerm}
                                className="py-2 pl-[15px] pr-[10px] rounded-[5px] border border-[#D8D6DE] placeholder:text-[#B9B9C3] text-[12px] font-normal text-[#6E6B7B] outline-none"
                                type="text"
                                id="search"
                                placeholder="Search subcategories..."
                            />
                        </div>
                        {validationErrors.subCategories && (
                            <p className="text-red-500 text-sm mb-2">
                                {validationErrors.subCategories}
                            </p>
                        )}

                        <div className="grid grid-cols-3 gap-5">
                            {filteredSubCategories?.map(
                                (subCategory: SubCategory) => {
                                    const isSelected =
                                        newMaintenance.subCategories.some(
                                            (sub) => sub === subCategory._id
                                        );
                                    return (
                                        <div
                                            key={subCategory._id}
                                            className={`rounded-sm ${
                                                isSelected
                                                    ? "bg-green-500"
                                                    : "bg-white"
                                            } transition-all duration-300 shadow-md p-4 flex justify-between items-center ${
                                                validationErrors.subCategories
                                                    ? "ring-2 ring-red-200"
                                                    : ""
                                            }`}
                                        >
                                            <div className="flex flex-col">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span
                                                            className={`font-medium ${
                                                                isSelected
                                                                    ? "text-white"
                                                                    : "text-gray-800"
                                                            }`}
                                                        >
                                                            {subCategory.name}
                                                        </span>
                                                        <span
                                                            className={`${
                                                                isSelected
                                                                    ? "text-white"
                                                                    : "text-gray-600"
                                                            } ml-2`}
                                                        >
                                                            (
                                                            {
                                                                subCategory
                                                                    .category
                                                                    .name
                                                            }
                                                            )
                                                        </span>
                                                    </div>
                                                </div>
                                                {subCategory.description && (
                                                    <p
                                                        className={`text-sm ${
                                                            isSelected
                                                                ? "text-white"
                                                                : "text-gray-600"
                                                        } mt-1`}
                                                    >
                                                        {
                                                            subCategory.description
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {isSelected ? (
                                                <Minus
                                                    onClick={() =>
                                                        handleRemoveSubCategory(
                                                            subCategory._id
                                                        )
                                                    }
                                                    className="hover:bg-black/10 text-white transition-all duration-300 rounded-full p-1 w-[28px] h-[28px] cursor-pointer"
                                                />
                                            ) : (
                                                <Plus
                                                    onClick={() =>
                                                        handleAddSubCategory(
                                                            subCategory._id
                                                        )
                                                    }
                                                    className="hover:bg-slate-200 transition-all duration-300 rounded-full p-1 w-[28px] h-[28px] cursor-pointer"
                                                />
                                            )}
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleAddMaintenance}
                    disabled={Object.keys(validationErrors).length > 0}
                    className={`cursor-pointer mt-4 px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
                        Object.keys(validationErrors).length > 0
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                >
                    <Plus className="w-4 h-4" />
                    Add Maintenance Record
                </button>
            </div>

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
                        <div
                            key={record._id}
                            className="bg-white border border-gray-200 rounded-lg p-4"
                        >
                            {editingRecord === record._id ? (
                                // Edit Mode
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-medium text-gray-800 text-lg">
                                            Edit Maintenance Record
                                        </h4>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    handleUpdateRecord(
                                                        record._id
                                                    )
                                                }
                                                className="text-green-600 hover:text-green-800 p-1 flex items-center gap-1"
                                            >
                                                <Save className="w-4 h-4" />
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
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
                                                Maintenance Cost ($)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={editForm.cost}
                                                onChange={(e) =>
                                                    setEditForm((prev) => ({
                                                        ...prev,
                                                        cost: e.target.value,
                                                    }))
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Mechanic Cost ($)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={editForm.mechanicCost}
                                                onChange={(e) =>
                                                    setEditForm((prev) => ({
                                                        ...prev,
                                                        mechanicCost:
                                                            e.target.value,
                                                    }))
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
                                                max={
                                                    new Date()
                                                        .toISOString()
                                                        .split("T")[0]
                                                }
                                                value={editForm.date}
                                                onChange={(e) =>
                                                    setEditForm((prev) => ({
                                                        ...prev,
                                                        date: e.target.value,
                                                    }))
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Edit Driver Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Driver
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {car.driver?.map(
                                                (driver: DriverToApi) => {
                                                    const isSelected =
                                                        editForm.driver ===
                                                        driver._id;
                                                    return (
                                                        <div
                                                            key={driver._id}
                                                            onClick={() =>
                                                                setEditForm(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        driver: driver._id,
                                                                    })
                                                                )
                                                            }
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
                                                                {driver.name}
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>

                                    {/* Edit SubCategories Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Sub Categories
                                        </label>
                                        <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                                            {subCategories?.map(
                                                (subCategory: SubCategory) => {
                                                    const isSelected =
                                                        editForm.subCategories.includes(
                                                            subCategory._id
                                                        );
                                                    return (
                                                        <div
                                                            key={
                                                                subCategory._id
                                                            }
                                                            onClick={() => {
                                                                if (
                                                                    isSelected
                                                                ) {
                                                                    setEditForm(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            subCategories:
                                                                                prev.subCategories.filter(
                                                                                    (
                                                                                        id
                                                                                    ) =>
                                                                                        id !==
                                                                                        subCategory._id
                                                                                ),
                                                                        })
                                                                    );
                                                                } else {
                                                                    setEditForm(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            subCategories:
                                                                                [
                                                                                    ...prev.subCategories,
                                                                                    subCategory._id,
                                                                                ],
                                                                        })
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
                                                                {
                                                                    subCategory.name
                                                                }
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // View Mode
                                <>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-medium text-gray-800 text-lg">
                                                {record.description}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Driver: {record.driver.name}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    handleEditRecord(record)
                                                }
                                                className="text-blue-600 hover:text-blue-800 p-1"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleRemoveMaintenance(
                                                        record._id
                                                    )
                                                }
                                                className="text-red-600 hover:text-red-800 p-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                                        <div>
                                            <span className="font-medium">
                                                Cost:
                                            </span>{" "}
                                            ${record.cost}
                                        </div>
                                        <div>
                                            <span className="font-medium">
                                                Mechanic Cost:
                                            </span>{" "}
                                            ${record.mechanicCost}
                                        </div>
                                        <div>
                                            <span className="font-medium">
                                                Date:
                                            </span>{" "}
                                            {record.date}
                                        </div>
                                        <div>
                                            <span className="font-medium">
                                                Car ID:
                                            </span>{" "}
                                            {record.car}
                                        </div>
                                    </div>

                                    {record.subCategories.length > 0 && (
                                        <div>
                                            <h5 className="font-medium text-gray-800 mb-2">
                                                Sub Categories:
                                            </h5>
                                            <div className="space-y-2">
                                                {record.subCategories.map(
                                                    (subCat) => (
                                                        <div
                                                            key={subCat._id}
                                                            className="bg-gray-50 p-3 rounded-md"
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <span className="font-medium text-gray-800">
                                                                        {
                                                                            subCat.name
                                                                        }
                                                                    </span>
                                                                    <span className="text-gray-600 ml-2">
                                                                        (
                                                                        {
                                                                            subCat
                                                                                .category
                                                                                .name
                                                                        }
                                                                        )
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {subCat.description && (
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    {
                                                                        subCat.description
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MaintenanceHistorySection;
