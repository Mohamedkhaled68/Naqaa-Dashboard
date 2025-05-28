import { Plus, Trash2, Wrench } from "lucide-react";
import React from "react";

type NM = {
    description: string;
    cost: string;
    date: string;
    subCategories: {
        name: string;
        categoryName: string;
        description: string;
    }[];
};

type MaintenanceHistorySectionprops = {
    newMaintenance: NM;
    setNewMaintenance: React.Dispatch<React.SetStateAction<NM>>;
    setCar: (car: Car) => void;
    car: Car;
};

const MaintenanceHistorySection = ({
    newMaintenance,
    setNewMaintenance,
    setCar,
    car,
}: MaintenanceHistorySectionprops) => {
    const handleSubCategoryUpdate = (
        index: number,
        field: string,
        value: string
    ) => {
        setNewMaintenance((prev) => ({
            ...prev,
            subCategories: prev.subCategories.map((subCat, i) =>
                i === index ? { ...subCat, [field]: value } : subCat
            ),
        }));
    };

    const handleAddSubCategory = () => {
        setNewMaintenance((prev) => ({
            ...prev,
            subCategories: [
                ...prev.subCategories,
                {
                    name: "",
                    categoryName: "",
                    description: "",
                },
            ],
        }));
    };

    const handleRemoveSubCategory = (index: number) => {
        setNewMaintenance((prev) => ({
            ...prev,
            subCategories: prev.subCategories.filter((_, i) => i !== index),
        }));
    };

    const handleAddMaintenance = () => {
        if (
            newMaintenance.description &&
            newMaintenance.cost &&
            newMaintenance.date &&
            car.driver.length > 0
        ) {
            const maintenance = {
                _id: Date.now().toString(),
                car: car._id,
                driver: car.driver[0],
                subCategories: newMaintenance.subCategories
                    .filter((sub) => sub.name && sub.categoryName)
                    .map((sub) => ({
                        _id: Date.now().toString() + Math.random(),
                        name: sub.name,
                        category: {
                            _id: Date.now().toString() + Math.random(),
                            name: sub.categoryName,
                        },
                        description: sub.description,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    })),
                description: newMaintenance.description,
                cost: parseFloat(newMaintenance.cost) || 0,
                date: newMaintenance.date,
            };

            setCar({
                ...car,
                maintenanceHistory: [...car.maintenanceHistory, maintenance],
            });

            // Reset form
            setNewMaintenance({
                description: "",
                cost: "",
                date: "",
                subCategories: [
                    {
                        name: "",
                        categoryName: "",
                        description: "",
                    },
                ],
            });
        }
    };

    const handleRemoveMaintenance = (id: string) => {
        setCar({
            ...car,
            maintenanceHistory: car.maintenanceHistory.filter(
                (item) => item._id !== id
            ),
        });
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
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Maintenance Record
                </h3>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={newMaintenance.description}
                                onChange={(e) =>
                                    setNewMaintenance((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Describe the maintenance work performed..."
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Total Cost ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={newMaintenance.cost}
                                onChange={(e) =>
                                    setNewMaintenance((prev) => ({
                                        ...prev,
                                        cost: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                value={newMaintenance.date}
                                onChange={(e) =>
                                    setNewMaintenance((prev) => ({
                                        ...prev,
                                        date: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Sub Categories */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Sub Categories
                            </label>
                            <button
                                onClick={handleAddSubCategory}
                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" />
                                Add Category
                            </button>
                        </div>

                        <div className="space-y-3">
                            {newMaintenance.subCategories.map(
                                (subCat, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border border-gray-200 rounded-md"
                                    >
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Category Name (e.g., Oil Change)"
                                                value={subCat.name}
                                                onChange={(e) =>
                                                    handleSubCategoryUpdate(
                                                        index,
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Main Category (e.g., Engine Maintenance)"
                                                value={subCat.categoryName}
                                                onChange={(e) =>
                                                    handleSubCategoryUpdate(
                                                        index,
                                                        "categoryName",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Description (optional)"
                                                value={subCat.description}
                                                onChange={(e) =>
                                                    handleSubCategoryUpdate(
                                                        index,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            {newMaintenance.subCategories
                                                .length > 1 && (
                                                <button
                                                    onClick={() =>
                                                        handleRemoveSubCategory(
                                                            index
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-800 p-2"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleAddMaintenance}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
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
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-medium text-gray-800 text-lg">
                                        {record.description}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        Driver: {record.driver.name}
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        handleRemoveMaintenance(record._id)
                                    }
                                    className="text-red-600 hover:text-red-800 p-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                                <div>
                                    <span className="font-medium">Cost:</span> $
                                    {record.cost}
                                </div>
                                <div>
                                    <span className="font-medium">Date:</span>{" "}
                                    {record.date}
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
                                                        <span className="font-medium text-gray-800">
                                                            {subCat.name}
                                                        </span>
                                                        <span className="text-gray-600 ml-2">
                                                            (
                                                            {
                                                                subCat.category
                                                                    .name
                                                            }
                                                            )
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
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MaintenanceHistorySection;
