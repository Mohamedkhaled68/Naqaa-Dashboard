"use client";
import React from "react";
import { RequestFilters } from "@/hooks/requests/useGetAllRequests";
import { Search, Filter, X } from "lucide-react";

interface RequestsFilterProps {
    filters: RequestFilters;
    onFiltersChange: (filters: RequestFilters) => void;
    onClearFilters: () => void;
}

const RequestsFilter: React.FC<RequestsFilterProps> = ({
    filters,
    onFiltersChange,
    onClearFilters,
}) => {
    const handleFilterChange = (key: keyof RequestFilters, value: string) => {
        onFiltersChange({
            ...filters,
            [key]: value || undefined, // Remove empty strings
        });
    };

    const hasActiveFilters = Object.values(filters).some((value) => value);

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="ml-auto flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Clear All
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Status Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <select
                        value={filters.status || ""}
                        onChange={(e) =>
                            handleFilterChange("status", e.target.value)
                        }
                        className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">All Statuses</option>
                        <option value="open">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                        <option value="underReview">Under Review</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* License Number Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        License Number
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={filters.licenseNumber || ""}
                            onChange={(e) =>
                                handleFilterChange(
                                    "licenseNumber",
                                    e.target.value
                                )
                            }
                            placeholder="Search by license number"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Start Date Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={filters.startDate || ""}
                        onChange={(e) =>
                            handleFilterChange("startDate", e.target.value)
                        }
                        className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* End Date Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={filters.endDate || ""}
                        onChange={(e) =>
                            handleFilterChange("endDate", e.target.value)
                        }
                        className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-gray-600 mr-2">
                            Active filters:
                        </span>
                        {filters.status && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                Status: {filters.status}
                                <button
                                    onClick={() =>
                                        handleFilterChange("status", "")
                                    }
                                    className="hover:bg-blue-200 rounded-full p-0.5"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {filters.licenseNumber && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                License: {filters.licenseNumber}
                                <button
                                    onClick={() =>
                                        handleFilterChange("licenseNumber", "")
                                    }
                                    className="hover:bg-green-200 rounded-full p-0.5"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {filters.startDate && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                From: {filters.startDate}
                                <button
                                    onClick={() =>
                                        handleFilterChange("startDate", "")
                                    }
                                    className="hover:bg-purple-200 rounded-full p-0.5"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {filters.endDate && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                                To: {filters.endDate}
                                <button
                                    onClick={() =>
                                        handleFilterChange("endDate", "")
                                    }
                                    className="hover:bg-orange-200 rounded-full p-0.5"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestsFilter;
