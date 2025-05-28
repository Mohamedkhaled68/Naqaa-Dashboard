import useGetDrivers from "@/hooks/drivers/useGetDrivers";
import { Minus, Plus, Trash2, User } from "lucide-react";
import React from "react";

type DriversSectionProps = {
    car: Car;
    setCar: (car: Car) => void;
};

const DriversSection = ({ car, setCar }: DriversSectionProps) => {
    const { data: drivers } = useGetDrivers();

    const handleRemoveDriver = (id: string) => {
        setCar({
            ...car,
            driver: car.driver.filter((driver) => driver._id !== id),
        });
    };

    const handleAddDriver = (driver: Driver) => {
        // Check if driver already exists
        const isDriverExist = car.driver.some((d) => d._id === driver._id);

        if (!isDriverExist) {
            setCar({
                ...car,
                driver: [...car.driver, driver],
            });
        }
    };

    if (!drivers) return;
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[#111]" />
                <h2 className="text-xl font-semibold text-gray-800">
                    Drivers Management
                </h2>
            </div>

            {/* Add New Driver */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Driver
                </h3>

                <div className="flex flex-col gap-2 h-[55vh] overflow-y-scroll">
                    {drivers.map((driver: Driver) => (
                        <div
                            key={driver._id}
                            className="flex items-center justify-between mb-4 py-4 px-8 bg-white shadow w-[90%] mx-auto rounded-lg"
                        >
                            <div className="flex items-center space-x-5">
                                <User className="w-5 h-5 text-gray-500" />
                                <div className="text-md">
                                    <span className="font-medium text-gray-900">
                                        {driver.name}
                                    </span>
                                    <span className="text-gray-500 ml-2">
                                        {driver.phoneNumber} • License:{" "}
                                        {driver.licenseNumber}
                                    </span>
                                </div>
                            </div>
                            {car.driver.find((dr) => dr._id === driver._id) ? (
                                <button
                                    onClick={() =>
                                        handleRemoveDriver(driver._id)
                                    }
                                    className="cursor-pointer text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
                                >
                                    <Minus className="w-4 h-4" />
                                    Remove Driver
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleAddDriver(driver)}
                                    className="cursor-pointer text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Driver
                                </button>
                            )}
                            {/* <button
                                onClick={() => handleAddDriver(driver)}
                                className="cursor-pointer text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Driver
                            </button> */}
                        </div>
                    ))}
                </div>
            </div>

            {/* Existing Drivers */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">
                    Current Drivers
                </h3>
                {car.driver.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        No drivers assigned to this car.
                    </p>
                ) : (
                    car.driver.map((driver) => (
                        <div
                            key={driver._id}
                            className="flex items-center justify-between py-5 px-8 bg-white shadow w-[90%] mx-auto rounded-lg"
                        >
                            <div className="flex items-center space-x-5">
                                <User className="w-5 h-5 text-gray-500" />
                                <div className="text-md">
                                    <span className="font-medium text-gray-900">
                                        {driver.name}
                                    </span>
                                    <span className="text-gray-500 ml-2">
                                        {driver.phoneNumber} • License:{" "}
                                        {driver.licenseNumber}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DriversSection;
