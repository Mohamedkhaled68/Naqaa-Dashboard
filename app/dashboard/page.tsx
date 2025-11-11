"use client";
import React, { useState } from "react";
import { Car, Users, Search, Eye } from "lucide-react";
import useTotalGetCars from "@/hooks/cars/useGetTotalCars";
import useTotalGetDrivers from "@/hooks/drivers/useGetTotalDrivers";
import useGetLastMaintenanceRequests from "@/hooks/requests/useGetLastMaintenanceRequests";
import Price from "@/components/Price";
import { useRouter } from "next/navigation";

const DashboardCards = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const { data: totalCars } = useTotalGetCars();
    const { data: totalDrivers } = useTotalGetDrivers();
    const { data: maintenanceData, isLoading } =
        useGetLastMaintenanceRequests();

    console.log(totalCars);

    // Get maintenance records from API
    const maintenanceRecords =
        maintenanceData?.data.recentMaintenanceRecords.data || [];
    const statistics = maintenanceData?.data.statistics;

    // Format date to readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const filteredData = maintenanceRecords.filter((item) => {
        const matchesSearch =
            item.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.car.plateNumber
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            item.car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.subCategories.some((sub) =>
                sub.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        return matchesSearch;
    });

    const handleView = (id: string) => {
        router.push(`/dashboard/requests/${id}`);
    };

    return (
        <div className="space-y-8">
            {/* Dashboard Cards */}
            <div className="flex gap-6 mb-8">
                {/* Total Cars Card */}
                <div className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-blue-100 text-sm font-medium mb-2">
                                Total Cars
                            </h3>
                            <p className="text-3xl font-bold mb-1">
                                {totalCars && totalCars.toLocaleString()}
                            </p>
                            <p className="text-blue-100 text-sm">
                                Active Vehicles
                            </p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl">
                            <Car className="w-8 h-8" />
                        </div>
                    </div>

                    {/* Optional: Add trend indicator */}
                    <div className="mt-4 flex items-center text-sm text-blue-100">
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">
                            {statistics?.recentActivity
                                .maintenanceRecordsLast30Days || 0}{" "}
                            records this month
                        </span>
                    </div>
                </div>

                {/* Total Drivers Card */}
                <div className="flex-1 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-gray-300 text-sm font-medium mb-2">
                                Total Drivers
                            </h3>
                            <p className="text-3xl font-bold mb-1">
                                {totalDrivers && totalDrivers.toLocaleString()}
                            </p>
                            <p className="text-gray-300 text-sm">
                                Registered Drivers
                            </p>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl">
                            <Users className="w-8 h-8" />
                        </div>
                    </div>

                    {/* Optional: Add trend indicator */}
                    <div className="mt-4 flex items-center text-sm text-gray-300">
                        <span className="bg-white/20 px-2 py-1 rounded text-xs">
                            Active drivers
                        </span>
                    </div>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Table Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">
                            Recent Maintenance Records
                        </h2>
                        {statistics && (
                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-600">
                                    Total Records:{" "}
                                    <span className="font-semibold text-gray-900">
                                        {statistics.totalStats.totalRecords}
                                    </span>
                                </span>
                                <span className="text-gray-600">
                                    Total Cost:{" "}
                                    <Price
                                        amount={statistics.totalStats.totalCost}
                                        className="font-semibold text-gray-900"
                                    />
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Search and Filter */}
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by driver, car, or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Car Info
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Driver
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cost
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center"
                                    >
                                        <p className="text-gray-500">
                                            Loading maintenance records...
                                        </p>
                                    </td>
                                </tr>
                            ) : filteredData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center"
                                    >
                                        <p className="text-gray-500">
                                            No maintenance records found.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="hover:bg-gray-50 transition-colors cursor-pointer "
                                        onClick={() => handleView(item._id)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="p-2 rounded-lg mr-3 bg-blue-100">
                                                    <Car className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.car.brand}{" "}
                                                        {item.car.model}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {item.car.plateNumber}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="p-2 rounded-lg mr-3 bg-green-100">
                                                    <Users className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.driver.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {
                                                            item.driver
                                                                .phoneNumber
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {item.subCategories.map(
                                                    (sub, idx) => (
                                                        <span
                                                            key={sub._id}
                                                            className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full mr-1 mb-1"
                                                        >
                                                            {sub.name}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <Price
                                                    amount={item.cost}
                                                    className="text-sm font-semibold text-gray-900"
                                                />
                                                <div className="text-xs text-gray-500">
                                                    Mechanic:{" "}
                                                    <Price
                                                        amount={
                                                            item.mechanicCost
                                                        }
                                                        className="text-xs"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-600">
                                                {formatDate(item.date)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardCards;
