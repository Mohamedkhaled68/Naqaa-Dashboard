import useCreateMaintenanceRecord from "@/hooks/maintenance/useCreateMaintenanceRecord";
import useDeleteMaintenanceRecord from "@/hooks/maintenance/useDeleteMaintenanceRecord";
import useGetSubCategories from "@/hooks/subCategories/useGetSubCategories";
import { Minus, Plus, Trash2, Wrench } from "lucide-react";
import React, { useEffect, useState } from "react";

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
        name: string;
        id: string;
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
    const [searchTerm, setSearchTerm] = useState("");
    const [result, setResult] = useState(null);
    const { data: subCategories } = useGetSubCategories();
    const { mutateAsync: createMaintenanceRecord } =
        useCreateMaintenanceRecord();
    const { mutateAsync: deleteMaintenanceRecord } =
        useDeleteMaintenanceRecord();

    const handleAddDriver = (driverId: string) => {
        setNewMaintenance((prev) => ({
            ...prev,
            driver: driverId,
        }));
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
        if (
            newMaintenance.driver &&
            newMaintenance.cost &&
            newMaintenance.date &&
            car.driver.length > 0
        ) {
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

            console.log({
                ...newMaintenance,
                car: car._id,
                description,
                date: convertToISOStringWithCurrentTime(newMaintenance.date),
            });
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
        }
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

    useEffect(() => {
        if (searchTerm) {
        }
    }, [searchTerm]);

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
                                Mechanic Cost ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={newMaintenance.mechanicCost}
                                onChange={(e) =>
                                    setNewMaintenance((prev) => ({
                                        ...prev,
                                        mechanicCost: e.target.value,
                                    }))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Maintenance Cost ($)
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

                    {/* Drivers */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Drivers
                            </label>
                        </div>

                        <div className="grid grid-cols-3 gap-5">
                            {car.driver?.map((driver: DriverToApi) => {
                                const isSelected =
                                    newMaintenance.driver === driver._id;
                                return (
                                    <div
                                        key={driver._id}
                                        className={`rounded-sm ${
                                            isSelected
                                                ? "bg-green-500"
                                                : "bg-white"
                                        } transition-all duration-300 shadow-md p-4  flex justify-between items-center`}
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
                                                }  mt-1`}
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
                                                    handleAddDriver(driver._id)
                                                }
                                                className="hover:bg-slate-200 transition-all duration-300 rounded-full p-1 w-[28px] h-[28px] cursor-pointer"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sub Categories */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Sub Categories
                            </label>
                            <input
                                // onChange={(e) => {
                                //     setSearchTerm(e.target.value.trim());
                                // }}
                                // value={searchTerm}
                                className="py-2 pl-[15px] pr-[10px] rounded-[5px] border border-[#D8D6DE] placeholder:text-[#B9B9C3] text-[12px] font-normal text-[#6E6B7B] outline-none"
                                type="text"
                                id="search"
                                placeholder="Search..."
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-5">
                            {subCategories?.map((subCategory: SubCategory) => {
                                const isSelected =
                                    newMaintenance.subCategories.some(
                                        (sub) => sub === subCategory._id
                                    );
                                return (
                                    <div
                                        key={subCategory.name}
                                        className={`rounded-sm ${
                                            isSelected
                                                ? "bg-green-500"
                                                : "bg-white"
                                        } transition-all duration-300 shadow-md p-4  flex justify-between items-center`}
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
                                                            subCategory.category
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
                                                    }  mt-1`}
                                                >
                                                    {subCategory.description}
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
                            })}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleAddMaintenance}
                    className="cursor-pointer mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
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
                                    <span className="font-medium">
                                        Mechanic Cost:
                                    </span>{" "}
                                    ${record.mechanicCost}
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
