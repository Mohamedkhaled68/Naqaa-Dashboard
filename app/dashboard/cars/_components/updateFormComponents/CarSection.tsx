"use client";
import { brands } from "@/utils/carBrands";
import { Edit3 } from "lucide-react";
import React, { useEffect, useState } from "react";

type CarSectionProps = {
    car: Car;
    handleCarUpdate: (field: string, value: string) => void;
};

const CarSection = ({ handleCarUpdate, car }: CarSectionProps) => {
    const [carModels, setCarModels] = useState<string[]>([]);

    useEffect(() => {
        const selectedBrand = brands.find((brand) => brand.brand === car.brand);
        if (selectedBrand) {
            setCarModels(selectedBrand.models);
        } else {
            setCarModels([]);
            handleCarUpdate("model", "");
        }
    }, [car.brand]);
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Edit3 className="w-5 h-5 text-[#111]" />
                <h2 className="text-xl font-semibold text-gray-800">
                    Car Details
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plate Number
                    </label>
                    <input
                        type="text"
                        value={car.plateNumber}
                        onChange={(e) =>
                            handleCarUpdate("plateNumber", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>
                    <select
                        value={car.status}
                        onChange={(e) =>
                            handleCarUpdate("status", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="available">Available</option>
                        <option value="in-use">In Use</option>
                        <option value="maintenance">Under Maintenance</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brand
                    </label>
                    <select
                        value={car.brand}
                        onChange={(e) =>
                            handleCarUpdate("brand", e.target.value)
                        }
                        name="brand"
                        id="brand"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {brands.map((brand) => (
                            <option key={brand.brand} value={brand.brand}>
                                {brand.brand}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Model
                    </label>
                    <select
                        value={car.model}
                        onChange={(e) =>
                            handleCarUpdate("brand", e.target.value)
                        }
                        id="model"
                        name="model"
                        disabled={!car.brand}
                        className={`w-full p-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed `}
                    >
                        <option value="">
                            {car.brand
                                ? "Choose a model"
                                : "Select brand first"}
                        </option>
                        {carModels.map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year
                    </label>
                    <input
                        type="number"
                        value={car.year}
                        onChange={(e) =>
                            handleCarUpdate("year", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color
                    </label>
                    <input
                        type="text"
                        value={car.color}
                        onChange={(e) =>
                            handleCarUpdate("color", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meter Reading
                    </label>
                    <input
                        type="number"
                        value={car.meterReading}
                        onChange={(e) =>
                            handleCarUpdate("meterReading", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default CarSection;
