"use client";
import React, { useState } from "react";
import { Car, User, Wrench, Save } from "lucide-react";
import CarSection from "./updateFormComponents/CarSection";
import MaintenanceHistorySection from "./updateFormComponents/MaintenanceHistorySection";
import DriversSection from "./updateFormComponents/DriversSection";
import useUpdateCar from "@/hooks/cars/useUpdateCar";
import { useCurrentCarStore } from "@/store/cars/useCurrentCarStore";

const UpdatCarForm = () => {
    const { car, setCar, clearCar } = useCurrentCarStore((state) => state);
    const [activeSection, setActiveSection] = useState("car");
    const { mutateAsync: updateCar } = useUpdateCar();

    // Initial car data based on the provided types

    const [newMaintenance, setNewMaintenance] = useState({
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

    const handleCarUpdate = (field: string, value: string) => {
        if (!car) return;
        setCar({
            ...car,
            [field]: value,
            updatedAt: new Date().toISOString(),
        });
    };
    const handleSave = async () => {
        if (!car?._id) {
            throw new Error("Car ID is missing.");
        }
        const updatedCarData = {
            ...car,
            _id: car._id, // Ensure _id is always defined and of type string
            updatedAt: new Date().toISOString(),
        };

        await updateCar({ id: car._id, data: updatedCarData });
        clearCar();
    };

    if (!car || !car) {
        return null;
    } else {
        return (
            <div className="max-w-full min-h-screen">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#222] text-white p-6">
                        <div className="flex items-center gap-3">
                            <Car className="w-8 h-8" />
                            <div>
                                <h1 className="text-2xl font-bold">
                                    Update Car Information
                                </h1>
                                <p className="text-white">
                                    Plate Number: {car?.plateNumber}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex border-b border-slate-200">
                        <button
                            onClick={() => setActiveSection("car")}
                            className={`flex-1 px-6 cursor-pointer py-3 text-center font-medium transition-colors ${
                                activeSection === "car"
                                    ? "bg-slate-100 text-[#000] border-b-2 border-[#333]"
                                    : "text-gray-600 hover:bg-slate-50"
                            }`}
                        >
                            <Car className="w-5 h-5 inline mr-2" />
                            Car Details
                        </button>
                        <button
                            onClick={() => setActiveSection("drivers")}
                            className={`flex-1 px-6 cursor-pointer py-3 text-center font-medium transition-colors ${
                                activeSection === "drivers"
                                    ? "bg-slate-100 text-[#000] border-b-2 border-[#333]"
                                    : "text-gray-600 hover:bg-slate-50"
                            }`}
                        >
                            <User className="w-5 h-5 inline mr-2" />
                            Drivers ({car?.driver.length})
                        </button>
                        <button
                            onClick={() => setActiveSection("maintenance")}
                            className={`flex-1 px-6 cursor-pointer py-3 text-center font-medium transition-colors ${
                                activeSection === "maintenance"
                                    ? "bg-slate-100 text-[#000] border-b-2 border-[#333]"
                                    : "text-gray-600 hover:bg-slate-50"
                            }`}
                        >
                            <Wrench className="w-5 h-5 inline mr-2" />
                            Maintenance ({car?.maintenanceHistory.length})
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Car Details Section */}
                        {activeSection === "car" && (
                            <CarSection
                                car={car}
                                handleCarUpdate={handleCarUpdate}
                            />
                        )}
                        {/* Drivers Section */}
                        {activeSection === "drivers" && (
                            <DriversSection car={car} setCar={setCar} />
                        )}

                        {/* Maintenance History Section */}
                        {activeSection === "maintenance" && (
                            <MaintenanceHistorySection
                                car={car}
                                newMaintenance={newMaintenance}
                                setCar={setCar}
                                setNewMaintenance={setNewMaintenance}
                            />
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-slate-200">
                        <button
                            onClick={handleSave}
                            className="w-full bg-[#222] text-white py-3 px-6 rounded-md hover:bg-[#111] cursor-pointer transition-colors flex items-center justify-center gap-2 font-medium"
                        >
                            <Save className="w-5 h-5" />
                            Save All Changes
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default UpdatCarForm;
