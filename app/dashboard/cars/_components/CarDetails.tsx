"use client";
import React, { useState, useMemo } from "react";
import {
    Calendar,
    Car,
    User,
    Wrench,
    ArrowUpDown,
    History,
} from "lucide-react";
import Price from "@/components/Price";
import useDeleteCar from "@/hooks/cars/useDeleteCar";
import { useCurrentCarStore } from "@/store/cars/useCurrentCarStore";
import { useRouter } from "next/navigation";
import { useModal } from "@/store/useModal";
import DeletionWarningModal from "@/components/DeletionWarningModal";
import MeterReadingsHistoryModal from "./MeterReadingsHistoryModal";
import MaintenanceRecordModal from "./MaintenanceRecordModal";
import { useCanDeleteCar, useCanEditCar } from "@/utils/permissions";

const CarDetails = () => {
    const { car } = useCurrentCarStore((state) => state);
    const { mutateAsync: deleteCar } = useDeleteCar();
    const [sortOrder, setSortOrder] = useState<
        "newest" | "oldest" | "this-week" | "this-month" | "this-year"
    >("newest");
    const [selectedDate, setSelectedDate] = useState<string>("");

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

    const handleOpenMeterReadingsHistory = () => {
        onOpen(
            <MeterReadingsHistoryModal
                readings={car?.meterReadingsHistory || []}
                carName={`${car?.brand} ${car?.model} - ${car?.plateNumber}`}
            />
        );
    };

    const handleOpenMaintenanceRecord = (record: any) => {
        onOpen(
            <MaintenanceRecordModal
                record={record}
                carName={`${car?.brand} ${car?.model} - ${car?.plateNumber}`}
            />
        );
    };

    const totalMaintenanceCost = car?.maintenanceHistory.reduce(
        (total, record) => {
            const cost = (record.cost || 0) + (record.mechanicCost || 0);
            return total + cost;
        },
        0
    );

    // Sort and filter maintenance history based on selected order and date
    const sortedMaintenanceHistory = useMemo(() => {
        if (!car?.maintenanceHistory) return [];

        let filtered = [...car.maintenanceHistory];

        // Filter by specific date if selected
        if (selectedDate) {
            const selectedDateObj = new Date(selectedDate);
            filtered = filtered.filter((record) => {
                const recordDate = new Date(record.date);
                return (
                    recordDate.toDateString() === selectedDateObj.toDateString()
                );
            });
        } else {
            // Filter by date range if no specific date is selected
            const now = new Date();
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            startOfWeek.setHours(0, 0, 0, 0);

            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const startOfYear = new Date(now.getFullYear(), 0, 1);

            switch (sortOrder) {
                case "this-week":
                    filtered = filtered.filter(
                        (record) => new Date(record.date) >= startOfWeek
                    );
                    break;
                case "this-month":
                    filtered = filtered.filter(
                        (record) => new Date(record.date) >= startOfMonth
                    );
                    break;
                case "this-year":
                    filtered = filtered.filter(
                        (record) => new Date(record.date) >= startOfYear
                    );
                    break;
            }
        }

        // Sort by date
        return filtered.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            // For date range filters, show newest first by default
            if (
                sortOrder === "this-week" ||
                sortOrder === "this-month" ||
                sortOrder === "this-year" ||
                selectedDate
            ) {
                return dateB - dateA;
            }

            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });
    }, [car?.maintenanceHistory, sortOrder, selectedDate]);

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
                    {car?.status === "in_use" ? "in use" : car?.status}
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
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-gray-500">
                            Meter Reading
                        </h3>
                        {car?.meterReadingsHistory &&
                            car.meterReadingsHistory.length > 0 && (
                                <button
                                    onClick={handleOpenMeterReadingsHistory}
                                    className="cursor-pointer flex items-center space-x-1 px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                                    title="View meter readings history"
                                >
                                    <History className="w-3 h-3" />
                                    <span>History</span>
                                </button>
                            )}
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">
                        {car?.meterReading
                            ? car?.meterReading.toLocaleString()
                            : "N/A"}
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
                            {(sortOrder === "newest" ||
                                sortOrder === "oldest") &&
                            !selectedDate
                                ? `${car?.maintenanceHistory.length} records`
                                : `${sortedMaintenanceHistory.length} of ${car?.maintenanceHistory.length} records`}
                        </span>
                    </div>

                    {/* Sort and Date Filter Controls */}
                    <div className="flex items-center space-x-4">
                        {/* Date Filter */}
                        <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <label
                                htmlFor="date-filter"
                                className="text-sm font-medium text-gray-700"
                            >
                                Filter by Date:
                            </label>
                            <input
                                id="date-filter"
                                type="date"
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }
                                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {selectedDate && (
                                <button
                                    onClick={() => setSelectedDate("")}
                                    className="px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* Sort Control */}
                        <div className="flex items-center space-x-2">
                            <ArrowUpDown className="w-4 h-4 text-gray-500" />
                            <label
                                htmlFor="sort-select"
                                className="text-sm font-medium text-gray-700"
                            >
                                Sort/Filter:
                            </label>
                            <select
                                id="sort-select"
                                value={sortOrder}
                                onChange={(e) =>
                                    setSortOrder(
                                        e.target.value as
                                            | "newest"
                                            | "oldest"
                                            | "this-week"
                                            | "this-month"
                                            | "this-year"
                                    )
                                }
                                disabled={!!selectedDate}
                                className={`px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    selectedDate
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                            >
                                <option value="newest">
                                    All - Newest First
                                </option>
                                <option value="oldest">
                                    All - Oldest First
                                </option>
                                <option value="this-week">This Week</option>
                                <option value="this-month">This Month</option>
                                <option value="this-year">This Year</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {sortedMaintenanceHistory.map((record) => (
                        <div
                            key={record._id}
                            className="border rounded-lg p-3 hover:shadow-md transition-shadow h-[60px] flex items-center justify-between cursor-pointer hover:bg-gray-50"
                            onClick={() => handleOpenMaintenanceRecord(record)}
                        >
                            {/* Left side - Date and Description */}
                            <div className="flex items-center space-x-4 flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                    <span className="text-sm font-medium text-gray-900">
                                        {formatDate(record.date)}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-700 truncate">
                                        {record.description}
                                    </p>
                                </div>
                            </div>

                            {/* Center - Driver Info */}
                            <div className="flex items-center space-x-2 px-3">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                    {record.driver.name}
                                </span>
                            </div>

                            {/* Right side - Services and Cost */}
                            <div className="flex items-center space-x-4">
                                <div className="text-xs text-gray-500">
                                    {record.subCategories.length} service
                                    {record.subCategories.length > 1 ? "s" : ""}
                                </div>
                                <Price
                                    amount={
                                        (record.cost || 0) +
                                        (record.mechanicCost || 0)
                                    }
                                    size="sm"
                                    className="text-sm font-semibold"
                                />
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
