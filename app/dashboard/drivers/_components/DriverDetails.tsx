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
    AlertCircle,
    Car,
    Calendar,
    Activity,
    Gauge,
} from "lucide-react";
import Price from "@/components/Price";
import { useCurrentDriverStore } from "@/store/drivers/useCurrentDriverStore";
import toast from "react-hot-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDeleteDriver from "@/hooks/drivers/useDelteDriver";
import useGetDriverMaintenance from "@/hooks/drivers/useGetDriverMaintenance";
import DeletionWarningModal from "@/components/DeletionWarningModal";
import { useModal } from "@/store/useModal";
import UpdateDriverForm from "./UpdateDriverForm";
import { endcodeNationalId, extractIdFromUrl } from "@/utils/helpers";
import useGetDriver from "@/hooks/drivers/useGetDriver";

const DriverDetails = () => {
    const { driver } = useCurrentDriverStore((state) => state);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { mutateAsync: deleteDriver } = useDeleteDriver();
    const { data: records } = useGetDriverMaintenance(driver?._id);

    const { onOpen, onClose } = useModal();
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    const handleEdit = (): void => {
        if (!driver) return;

        onOpen(<UpdateDriverForm driver={driver} onClose={onClose} />);
    };

    const confirmDelete = async () => {
        if (!driver) return;
        setLoading(true);

        try {
            await deleteDriver(driver?._id);
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

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "available":
                return "text-green-600 bg-green-100";
            case "in-use":
                return "text-red-600 bg-red-100";
            case "maintenance":
                return "text-yellow-600 bg-yellow-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
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
                                                {driver.address
                                                    ? driver.address
                                                    : "--"}
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
                                        </div>{" "}
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                National ID
                                            </p>
                                            <p className="text-lg text-gray-900 font-mono">
                                                {endcodeNationalId(
                                                    driver.nationalId
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                License Expiry Date
                                            </p>
                                            <p className="text-lg text-gray-900 font-mono">
                                                {driver.licenseNumber}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Car Details */}
                            <div className="col-span-2">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 w-full">
                                    Assigned Vehicle
                                </h2>
                                {driver.car ? (
                                    <div className="grid grid-cols-3 gap-y-8 gap-x-5">
                                        <div className="flex items-start col-span-1">
                                            <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                                <Car className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    Plate Number
                                                </p>
                                                <p className="text-lg text-gray-900 font-mono font-bold">
                                                    {driver.car.plateNumber}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start col-span-1">
                                            <div className="bg-orange-100 p-3 rounded-lg mr-4">
                                                <Activity className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    Vehicle Details
                                                </p>
                                                <p className="text-lg text-gray-900">
                                                    {driver.car.brand}{" "}
                                                    {driver.car.model}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start col-span-1">
                                            <div className="bg-teal-100 p-3 rounded-lg mr-4">
                                                <Calendar className="w-5 h-5 text-teal-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    Year & Color
                                                </p>
                                                <p className="text-lg text-gray-900">
                                                    {driver.car.year} •{" "}
                                                    {driver.car.color}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start col-span-1">
                                            <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                                                <Gauge className="w-5 h-5 text-cyan-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    Meter Reading
                                                </p>
                                                <p className="text-lg text-gray-900">
                                                    {driver.car.meterReading.toLocaleString()}{" "}
                                                    km
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start col-span-1">
                                            <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">
                                                    Status
                                                </p>
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                        driver.car.status
                                                    )}`}
                                                >
                                                    {driver.car.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        driver.car.status.slice(
                                                            1
                                                        )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-gray-600 py-6 text-sm">
                                        No car assigned yet. Please assign a car
                                        to proceed.
                                    </div>
                                )}

                                <h2 className="text-xl font-bold text-gray-900 mb-6 w-full mt-10">
                                    Vehicle Maintenance Records
                                </h2>
                                <div className="space-y-6">
                                    {records &&
                                        records.length > 0 &&
                                        records?.map((record: any) => (
                                            <div
                                                key={record._id}
                                                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        <Calendar className="w-5 h-5 text-gray-500" />
                                                        <span className="text-lg font-semibold text-gray-900">
                                                            {formatDate(
                                                                record.date
                                                            )}
                                                        </span>
                                                    </div>{" "}
                                                    <div className="flex items-center space-x-2">
                                                        <Price
                                                            amount={
                                                                record.cost ||
                                                                record.cost ||
                                                                0
                                                            }
                                                            size="lg"
                                                            className="text-lg font-bold"
                                                        />
                                                        {record.cost && (
                                                            <span className="text-sm text-gray-500">
                                                                (Mechanic:{" "}
                                                                <Price
                                                                    amount={
                                                                        record.cost
                                                                    }
                                                                    showIcon={
                                                                        false
                                                                    }
                                                                />
                                                                )
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <p className="text-gray-700 mb-4">
                                                    {record.description}
                                                </p>

                                                {/* Driver Info */}
                                                <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
                                                    <User className="w-4 h-4 text-gray-500" />
                                                    <div className="text-sm">
                                                        <span className="font-medium text-gray-900">
                                                            {driver.name}
                                                        </span>
                                                        <span className="text-gray-500 ml-2">
                                                            {driver.phoneNumber}{" "}
                                                            • License:{" "}
                                                            {
                                                                driver.licenseNumber
                                                            }
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Service Categories */}
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                                                        Services Performed:
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {record.subCategories.map(
                                                            (
                                                                subCategory: any
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        subCategory._id
                                                                    }
                                                                    className="bg-blue-50 border border-blue-200 rounded-lg p-2"
                                                                >
                                                                    <div className="text-sm font-medium text-blue-900">
                                                                        {
                                                                            subCategory.name
                                                                        }
                                                                    </div>
                                                                    <div className="text-xs text-blue-700">
                                                                        {
                                                                            subCategory
                                                                                .category
                                                                                .name
                                                                        }
                                                                    </div>
                                                                    <div className="text-xs text-gray-600 mt-1">
                                                                        {
                                                                            subCategory.description
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    {records && records?.length < 1 && (
                                        <div className="text-sm text-slate-500">
                                            🚫 No records found. Please try
                                            again later or adjust your search.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center justify-between mb-8 px-8">
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
                                onClick={() => {
                                    onOpen(
                                        <DeletionWarningModal
                                            deleteFunc={confirmDelete}
                                            id={driver._id}
                                            item="driver"
                                        />
                                    );
                                }}
                                className="flex items-center bg-red-500 text-white px-8 cursor-pointer py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverDetails;
