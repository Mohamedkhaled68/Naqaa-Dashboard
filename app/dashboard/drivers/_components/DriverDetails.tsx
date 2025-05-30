"use client";
import React, { useState } from "react";
import {
    User,
    Phone,
    CreditCard,
    FileText,
    MapPin,
    Edit3,
    Trash2,
    CheckCircle,
    Clock,
    AlertCircle,
} from "lucide-react";
import { useCurrentDriverStore } from "@/store/drivers/useCurrentDriverStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Add this import at the top
import useDeleteDriver from "@/hooks/drivers/useDelteDriver";

const DriverDetails = () => {
    const { driver } = useCurrentDriverStore((state) => state);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter(); // Add this hook
    const { mutateAsync: deleteDriver } = useDeleteDriver();

    const handleEdit = (): void => {
        alert("Edit functionality would redirect to edit form");
    };

    const confirmDelete = async (driverId: string) => {
        setLoading(true);
        try {
            await deleteDriver(driverId);
            toast.success("Driver deleted successfully!");
        } catch (err: any) {
            toast.error(err?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = (): void => {
        router.back();
    };

    if (!driver) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Driver Not Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        The requested driver could not be found.
                    </p>
                    <button
                        onClick={handleBack}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 w-full">
            <div className="w-full mx-auto">
                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-black to-gray-800 p-8 text-white">
                        <div className="flex items-center">
                            <div className="bg-white bg-opacity-20 rounded-full p-4 mr-6">
                                <User className="w-12 h-12" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold mb-2">
                                    {driver.name}
                                </h1>
                                <p className="text-indigo-100">
                                    Driver ID: {driver._id}
                                </p>
                                <div className="flex items-center mt-2">
                                    <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                                    <span className="text-sm">
                                        Active Driver
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Contact Information */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-6">
                                    Contact Information
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                                            <Phone className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Phone Number
                                            </p>
                                            <p className="text-lg text-gray-900">
                                                {driver.phoneNumber}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                                            <MapPin className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                Address
                                            </p>
                                            <p className="text-lg text-gray-900">
                                                {driver.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Legal Information */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-6">
                                    Legal Information
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="bg-green-100 p-3 rounded-lg mr-4">
                                            <CreditCard className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                National ID
                                            </p>
                                            <p className="text-lg text-gray-900 font-mono">
                                                {driver.nationalId}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                License Number
                                            </p>
                                            <p className="text-lg text-gray-900 font-mono">
                                                {driver.licenseNumber}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center justify-start mb-8 px-8">
                        <div className="flex space-x-3">
                            <button
                                onClick={handleEdit}
                                className="flex items-center bg-yellow-500 text-white px-8 cursor-pointer py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                            >
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit
                            </button>
                            <button
                                disabled={loading}
                                onClick={() => confirmDelete(driver._id)}
                                className="flex items-center bg-red-500 text-white px-8 cursor-pointer py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverDetails;
