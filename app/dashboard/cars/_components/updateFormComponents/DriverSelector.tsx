// filepath: c:\Users\NV_USER\Desktop\naqaa-dashboard\app\dashboard\cars\_components\updateFormComponents\DriverSelector.tsx
import React from "react";
import { Minus, Plus } from "lucide-react";

type DriverToApi = {
    _id: string;
    name: string;
    phoneNumber: string;
    nationalId: string;
    licenseNumber: string;
    address?: string;
};

interface DriverSelectorProps {
    drivers: DriverToApi[];
    selectedDriverId: string;
    onAddDriver: (driverId: string) => void;
    onRemoveDriver: () => void;
    validationError?: string;
}

const DriverSelector: React.FC<DriverSelectorProps> = ({
    drivers,
    selectedDriverId,
    onAddDriver,
    onRemoveDriver,
    validationError,
}) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                    Drivers *
                </label>
            </div>
            {validationError && (
                <p className="text-red-500 text-sm mb-2">{validationError}</p>
            )}

            <div className="grid grid-cols-3 gap-5">
                {drivers?.length > 0 ? (
                    drivers.map((driver: DriverToApi) => {
                        const isSelected = selectedDriverId === driver._id;
                        return (
                            <div
                                key={driver._id}
                                className={`rounded-sm ${
                                    isSelected ? "bg-green-500" : "bg-white"
                                } transition-all duration-300 shadow-md p-4 flex justify-between items-center ${
                                    validationError ? "ring-2 ring-red-200" : ""
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
                                        onClick={onRemoveDriver}
                                        className="hover:bg-black/10 text-white transition-all duration-300 rounded-full p-1 w-[28px] h-[28px] cursor-pointer"
                                    />
                                ) : (
                                    <Plus
                                        onClick={() => onAddDriver(driver._id)}
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
    );
};

export default DriverSelector;
