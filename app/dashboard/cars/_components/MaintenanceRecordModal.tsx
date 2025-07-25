"use client";
import React from "react";
import {
    Calendar,
    User,
    Wrench,
    X,
    MapPin,
    Phone,
    CreditCard,
} from "lucide-react";
import { useModal } from "@/store/useModal";
import Price from "@/components/Price";

interface MaintenanceRecordModalProps {
    record: {
        _id: string;
        car: string;
        mechanicCost: number;
        driver: {
            _id: string;
            name: string;
            phoneNumber: string;
            nationalId: string;
            licenseNumber: string;
            address: string;
        };
        subCategories: {
            _id: string;
            name: string;
            category: {
                _id: string;
                name: string;
            };
            description: string;
            createdAt: string;
            updatedAt: string;
        }[];
        description: string;
        cost: number;
        date: string;
        customFieldValues?: {
            fieldName: string;
            fieldValue: string;
            subcategoryId: string;
        }[];
    };
    carName?: string;
}

const MaintenanceRecordModal: React.FC<MaintenanceRecordModalProps> = ({
    record,
    carName,
}) => {
    const { onClose } = useModal();

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

    const totalCost = (record.cost || 0) + (record.mechanicCost || 0);

    return (
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center space-x-3">
                    <Wrench className="w-6 h-6 text-blue-600" />
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Maintenance Record Details
                        </h2>
                        {carName && (
                            <p className="text-sm text-gray-600">{carName}</p>
                        )}
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {/* Main Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Date and Cost */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <h3 className="text-lg font-semibold text-gray-900">
                                Service Date
                            </h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mb-2">
                            {formatDate(record.date)}
                        </p>
                    </div>

                    {/* Total Cost */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Total Cost
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">
                                    Service Cost:
                                </span>
                                <Price amount={record.cost || 0} size="sm" />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">
                                    Mechanic Cost:
                                </span>
                                <Price
                                    amount={record.mechanicCost || 0}
                                    size="sm"
                                />
                            </div>
                            <div className="border-t pt-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-900">
                                        Total:
                                    </span>
                                    <Price
                                        amount={totalCost}
                                        size="lg"
                                        className="text-lg font-bold text-green-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Service Description
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 leading-relaxed">
                            {record.description || "No description provided"}
                        </p>
                    </div>
                </div>

                {/* Driver Information */}
                <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                        <User className="w-5 h-5 text-gray-500" />
                        <h3 className="text-lg font-semibold text-gray-900">
                            Driver Information
                        </h3>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm font-medium text-gray-500">
                                    Name:
                                </span>
                                <p className="text-gray-900">
                                    {record.driver.name}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <div>
                                    <span className="text-sm font-medium text-gray-500">
                                        Phone:
                                    </span>
                                    <p className="text-gray-900">
                                        {record.driver.phoneNumber}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CreditCard className="w-4 h-4 text-gray-500" />
                                <div>
                                    <span className="text-sm font-medium text-gray-500">
                                        License:
                                    </span>
                                    <p className="text-gray-900">
                                        {record.driver.licenseNumber}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500">
                                    National ID:
                                </span>
                                <p className="text-gray-900">
                                    {record.driver.nationalId}
                                </p>
                            </div>
                            {record.driver.address && (
                                <div className="md:col-span-2 flex items-start space-x-2">
                                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">
                                            Address:
                                        </span>
                                        <p className="text-gray-900">
                                            {record.driver.address}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Services Performed */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Services Performed ({record.subCategories.length}{" "}
                        services)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {record.subCategories.map((subCategory) => (
                            <div
                                key={subCategory._id}
                                className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold text-blue-900">
                                        {subCategory.name}
                                    </h4>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                        {subCategory.category.name}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    {subCategory.description}
                                </p>
                                <div className="text-xs text-gray-500">
                                    Created:{" "}
                                    {formatDateShort(subCategory.createdAt)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Custom Fields (if any) */}
                {record.customFieldValues &&
                    record.customFieldValues.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Additional Information
                            </h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {record.customFieldValues.map(
                                        (field, index) => (
                                            <div key={index}>
                                                <span className="text-sm font-medium text-gray-500">
                                                    {field.fieldName}:
                                                </span>
                                                <p className="text-gray-900">
                                                    {field.fieldValue}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
            </div>

            {/* Footer */}
            <div className="border-t p-6 bg-gray-50">
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <div>
                        <span className="font-medium">Record ID:</span>{" "}
                        {record._id}
                    </div>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceRecordModal;
