"use client";
import React, { useState } from "react";
import { Car, Users, Search, Eye, Edit, Trash2 } from "lucide-react";
import useTotalGetCars from "@/hooks/cars/useGetTotalCars";
import useTotalGetDrivers from "@/hooks/drivers/useGetTotalDrivers";
import Price from "@/components/Price";

const DashboardCards = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const { data: totalCars } = useTotalGetCars();
    const { data: totalDrivers } = useTotalGetDrivers();

    console.log(totalCars);

    // Mock data - replace with your actual data    // Mock table data
    const tableData = [
        {
            id: 1,
            service: "Car Rental",
            amount: 100,
            date: "May 16, 2025 - 5:23 PM",
            status: "completed",
            customer: "Ahmed Al-Rashid",
        },
        {
            id: 2,
            service: "Car Rental",
            amount: 100,
            date: "May 11, 2025 - 5:23 PM",
            status: "completed",
            customer: "Sarah Johnson",
        },
        {
            id: 3,
            service: "Car Rental",
            amount: 100,
            date: "May 16, 2025 - 5:23 PM",
            status: "rejected",
            customer: "Mike Chen",
        },
        {
            id: 4,
            service: "Driver Service",
            amount: 75,
            date: "May 15, 2025 - 3:45 PM",
            status: "completed",
            customer: "Fatima Al-Zahra",
        },
        {
            id: 5,
            service: "Car Rental",
            amount: 120,
            date: "May 14, 2025 - 2:30 PM",
            status: "pending",
            customer: "John Smith",
        },
    ];

    const getStatusColor = (status: any) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const filteredData = tableData.filter((item) => {
        const matchesSearch =
            item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.service.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

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
                            +12 this month
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
                            +8 this month
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
                            Recent Transactions
                        </h2>
                        {/* <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View All
                        </button> */}
                    </div>

                    {/* Search and Filter */}
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search by customer or service..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        {/* <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select> */}
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Service
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div
                                                className={`p-2 rounded-lg mr-3 ${
                                                    item.service ===
                                                    "Car Rental"
                                                        ? "bg-blue-100"
                                                        : "bg-green-100"
                                                }`}
                                            >
                                                {item.service ===
                                                "Car Rental" ? (
                                                    <Car
                                                        className={`w-4 h-4 ${
                                                            item.service ===
                                                            "Car Rental"
                                                                ? "text-blue-600"
                                                                : "text-green-600"
                                                        }`}
                                                    />
                                                ) : (
                                                    <Users className="w-4 h-4 text-green-600" />
                                                )}
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">
                                                {item.service}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Price
                                            amount={item.amount}
                                            className="text-sm font-semibold"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600">
                                            {item.date}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                item.status
                                            )}`}
                                        >
                                            {item.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                item.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">
                                            {item.customer}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                {filteredData.length === 0 && (
                    <div className="px-6 py-8 text-center">
                        <p className="text-gray-500">
                            No transactions found matching your criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardCards;
