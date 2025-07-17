"use client";
import React, { useState, useMemo } from "react";
import { Calendar, Car, User, Wrench, ArrowUpDown } from "lucide-react";
import Price from "@/components/Price";
import useDeleteCar from "@/hooks/cars/useDeleteCar";
import { useCurrentCarStore } from "@/store/cars/useCurrentCarStore";
import { useRouter } from "next/navigation";
import { useModal } from "@/store/useModal";
import DeletionWarningModal from "@/components/DeletionWarningModal";
import { useCanDeleteCar, useCanEditCar } from "@/utils/permissions";

const CarDetails = () => {
    const { car } = useCurrentCarStore((state) => state);
    const { mutateAsync: deleteCar } = useDeleteCar();
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    const { onOpen } = useModal();
    const router = useRouter();

    // Permission checks
    const canDeleteCar = useCanDeleteCar();
    const canEditCar = useCanEditCar();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleDeleteCar = async () => {
        if (car) {
            deleteCar(car?._id);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "available":
                return "bg-green-100 text-green-800";
            case "in-use":
                return "bg-blue-100 text-blue-800";
            case "maintenance":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleUpdateNav = (car: Car) => {
        router.push(`/dashboard/cars/${car._id}/update`);
    };

    const totalMaintenanceCost = car?.maintenanceHistory.reduce(
        (total, record) => {
            const cost = (record.cost || 0) + (record.mechanicCost || 0);
            return total + cost;
        },
        0
    );

    // Sort maintenance history based on selected order
    const sortedMaintenanceHistory = useMemo(() => {
        if (!car?.maintenanceHistory) return [];

        return [...car.maintenanceHistory].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });
    }, [car?.maintenanceHistory, sortOrder]);

    if (!car) {
        return;
    }

    return (
        <div className="w-full p-6 bg-white shadow-lg rounded-lg">
            {/* Car Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <Car className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {car?.brand} {car?.model}
                        </h1>
                        <p className="text-lg text-gray-600">
                            Plate: {car?.plateNumber}
                        </p>
                    </div>
                </div>
                <span
                    className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(
                        car?.status
                    )}`}
                >
                    {car?.status === "in-use" ? "in use" : car?.status}
                </span>
            </div>

            {/* Car Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Year
                    </h3>
                    <p className="text-2xl font-semibold text-gray-900">
                        {car?.year}
                    </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Color
                    </h3>
                    <p className="text-2xl font-semibold text-gray-900">
                        {car?.color}
                    </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Meter Reading
                    </h3>
                    <p className="text-2xl font-semibold text-gray-900">
                        {car?.meterReading.toLocaleString()}
                    </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Total Maintenance Cost
                    </h3>{" "}
                    <p className="text-2xl font-semibold text-green-600">
                        <Price amount={totalMaintenanceCost ?? 0} />
                    </p>
                </div>
            </div>

            {/* Maintenance History */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                        <Wrench className="w-6 h-6 text-gray-600" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            Maintenance History
                        </h2>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                            {car?.maintenanceHistory.length} records
                        </span>
                    </div>

                    {/* Sort Control */}
                    <div className="flex items-center space-x-2">
                        <ArrowUpDown className="w-4 h-4 text-gray-500" />
                        <label
                            htmlFor="sort-select"
                            className="text-sm font-medium text-gray-700"
                        >
                            Sort by:
                        </label>
                        <select
                            id="sort-select"
                            value={sortOrder}
                            onChange={(e) =>
                                setSortOrder(
                                    e.target.value as "newest" | "oldest"
                                )
                            }
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-6">
                    {sortedMaintenanceHistory.map((record) => (
                        <div
                            key={record._id}
                            className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                    <span className="text-lg font-semibold text-gray-900">
                                        {formatDate(record.date)}
                                    </span>
                                </div>{" "}
                                <div className="flex items-center space-x-2">
                                    <Price
                                        amount={
                                            (record.cost || 0) +
                                            (record.mechanicCost || 0)
                                        }
                                        size="lg"
                                        className="text-lg font-bold"
                                    />
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
                                        {record.driver.name}
                                    </span>
                                    <span className="text-gray-500 ml-2">
                                        {record.driver.phoneNumber} • License:{" "}
                                        {record.driver.licenseNumber}
                                    </span>
                                </div>
                            </div>

                            {/* Service Categories */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">
                                    Services Performed:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {record.subCategories.map((subCategory) => (
                                        <div
                                            key={subCategory._id}
                                            className="bg-blue-50 border border-blue-200 rounded-lg p-2"
                                        >
                                            <div className="text-sm font-medium text-blue-900">
                                                {subCategory.name}
                                            </div>
                                            <div className="text-xs text-blue-700">
                                                {subCategory.category.name}
                                            </div>
                                            <div className="text-xs text-gray-600 mt-1">
                                                {subCategory.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Car Metadata */}
            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    System Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                        <span className="font-medium">Car ID:</span> {car?._id}
                    </div>
                    <div>
                        <span className="font-medium">Created:</span>{" "}
                        {formatDate(car?.createdAt)}
                    </div>
                    <div>
                        <span className="font-medium">Last Updated:</span>{" "}
                        {formatDate(car?.updatedAt)}
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-6">
                    {/* Delete Button - Only show for admin */}
                    {canDeleteCar && (
                        <div>
                            <button
                                className="cursor-pointer px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                                onClick={() => {
                                    onOpen(
                                        <DeletionWarningModal
                                            deleteFunc={handleDeleteCar}
                                            id={car._id}
                                            item="car"
                                        />
                                    );
                                }}
                            >
                                Delete Car
                            </button>
                        </div>
                    )}
                    {/* Update Button - Show for both admin and accountant */}
                    {canEditCar && (
                        <div>
                            <button
                                onClick={() => handleUpdateNav(car)}
                                className="cursor-pointer px-4 py-2 bg-orange-400 text-white text-sm rounded hover:bg-orange-500 transition"
                            >
                                Update Car
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
