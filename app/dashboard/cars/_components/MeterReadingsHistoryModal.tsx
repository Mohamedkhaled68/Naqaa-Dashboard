"use client";
import React, { useState, useMemo } from "react";
import { Calendar, TrendingUp, ArrowUpDown, X } from "lucide-react";
import { useModal } from "@/store/useModal";

interface MeterReading {
    reading: number;
    date: string;
    _id?: string;
}

interface MeterReadingsHistoryModalProps {
    readings: MeterReading[];
    carName?: string;
}

const MeterReadingsHistoryModal: React.FC<MeterReadingsHistoryModalProps> = ({
    readings,
    carName,
}) => {
    const { onClose } = useModal();
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatDateShort = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // Sort readings based on selected order
    const sortedReadings = useMemo(() => {
        if (!readings) return [];

        return [...readings].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });
    }, [readings, sortOrder]);

    // Calculate reading differences
    const readingsWithDifference = useMemo(() => {
        const sorted = [...sortedReadings].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        return sorted.map((reading, index) => {
            const previousReading = sorted[index - 1];
            const difference = previousReading
                ? reading.reading - previousReading.reading
                : null;

            return {
                ...reading,
                difference,
            };
        });
    }, [sortedReadings]);

    // Get the sorted version for display
    const displayReadings = useMemo(() => {
        return readingsWithDifference.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
        });
    }, [readingsWithDifference, sortOrder]);

    if (!readings || readings.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center space-x-3">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-bold text-gray-900">
                            Meter Readings History
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="p-8 text-center">
                    <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No Readings Available
                    </h3>
                    <p className="text-gray-500">
                        No meter readings have been recorded for this car yet.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center space-x-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Meter Readings History
                        </h2>
                        {carName && (
                            <p className="text-sm text-gray-600">{carName}</p>
                        )}
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                        {readings.length} records
                    </span>
                </div>
                <div className="flex items-center space-x-4">
                    {/* Sort Control */}
                    <div className="flex items-center space-x-2">
                        <ArrowUpDown className="w-4 h-4 text-gray-500" />
                        <select
                            value={sortOrder}
                            onChange={(e) =>
                                setSortOrder(
                                    e.target.value as "newest" | "oldest"
                                )
                            }
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                    {displayReadings.map((reading, index) => (
                        <div
                            key={reading._id || `reading-${index}`}
                            className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <span className="font-semibold text-gray-900">
                                            {reading.reading.toLocaleString()}{" "}
                                            km
                                        </span>
                                        <div className="text-sm text-gray-500">
                                            {formatDate(reading.date)}
                                        </div>
                                    </div>
                                </div>

                                {reading.difference !== null && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-500">
                                            Change:
                                        </span>
                                        <span
                                            className={`text-sm font-medium px-2 py-1 rounded-full ${
                                                reading.difference > 0
                                                    ? "bg-green-100 text-green-800"
                                                    : reading.difference < 0
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {reading.difference > 0 ? "+" : ""}
                                            {reading.difference.toLocaleString()}{" "}
                                            km
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer with Stats */}
            <div className="border-t p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                        <span className="font-medium text-gray-900">
                            Total Records:
                        </span>
                        <span className="ml-2 text-gray-600">
                            {readings.length}
                        </span>
                    </div>
                    <div className="text-center">
                        <span className="font-medium text-gray-900">
                            Latest Reading:
                        </span>
                        <span className="ml-2 text-gray-600">
                            {Math.max(
                                ...readings.map((r) => r.reading)
                            ).toLocaleString()}{" "}
                            km
                        </span>
                    </div>
                    <div className="text-center">
                        <span className="font-medium text-gray-900">
                            Oldest Reading:
                        </span>
                        <span className="ml-2 text-gray-600">
                            {Math.min(
                                ...readings.map((r) => r.reading)
                            ).toLocaleString()}{" "}
                            km
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeterReadingsHistoryModal;
