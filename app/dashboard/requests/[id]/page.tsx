"use client";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    CheckCircle,
    Car,
    User,
    Calendar,
    DollarSign,
    FileText,
    Wrench,
} from "lucide-react";
import useGetRequestById from "@/hooks/requests/useGetRequestById";
import useCompleteRequest from "@/hooks/requests/useCompeleteRequest";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

const RequestDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const requestId = params.id as string;
    const [isCompleting, setIsCompleting] = useState(false);

    const { data: request, isLoading, error } = useGetRequestById(requestId);
    const { mutateAsync: completeRequest, isPending } = useCompleteRequest();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "open":
                return "text-blue-600 bg-blue-100";
            case "accepted":
                return "text-green-600 bg-green-100";
            case "rejected":
                return "text-red-600 bg-red-100";
            case "underreview":
                return "text-yellow-600 bg-yellow-100";
            case "completed":
                return "text-green-600 bg-green-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    };

    const handleCompleteRequest = async () => {
        try {
            setIsCompleting(true);
            await completeRequest({
                requestId: requestId,
                status: "completed",
            });
            // Optionally redirect back to requests list
            router.push("/dashboard/requests");
        } catch (error) {
            console.error("Error completing request:", error);
        } finally {
            setIsCompleting(false);
        }
    };

    const handleBack = () => {
        router.back();
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader size={50} />
            </div>
        );
    }

    if (error || !request) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-red-600 text-lg mb-4">
                    Failed to load request details
                </p>
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Request Details #{request._id.slice(-8)}
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            request.status
                        )}`}
                    >
                        {request.status}
                    </span>
                    {request.status === "underReview" && (
                        <button
                            onClick={handleCompleteRequest}
                            disabled={isCompleting}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isCompleting ? (
                                <ClipLoader size={16} color="white" />
                            ) : (
                                <CheckCircle className="w-4 h-4" />
                            )}
                            Complete Request
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Driver Information */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <User className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Driver Information
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium text-gray-900">
                                    {request.driver.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Phone Number
                                </p>
                                <p className="font-medium text-gray-900">
                                    {request.driver.phoneNumber}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Car Information */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Car className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Car Information
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Brand</p>
                                <p className="font-medium text-gray-900">
                                    {request.car.brand}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Model</p>
                                <p className="font-medium text-gray-900">
                                    {request.car.model}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Plate Number
                                </p>
                                <p className="font-medium text-gray-900">
                                    {request.car.plateNumber}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Service Categories */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Wrench className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Service Categories
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {request.subCategories.map((category, index) => (
                                <div
                                    key={category._id}
                                    className="border rounded-lg p-4"
                                >
                                    <h3 className="font-medium text-gray-900">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {category.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Custom Fields */}
                    {request.customFieldData &&
                        request.customFieldData.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Additional Information
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {request.customFieldData.map(
                                        (field, index) => (
                                            <div
                                                key={field._id || index}
                                                className="flex justify-between"
                                            >
                                                <span className="text-sm text-gray-500">
                                                    {field.fieldName}:
                                                </span>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {field.fieldValue}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                    {/* Description */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Description
                            </h2>
                        </div>
                        <p className="text-gray-700">{request.description}</p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Cost Information */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Cost Information
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                    Total Cost:
                                </span>
                                <span className="font-medium text-gray-900">
                                    ${request.cost}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">
                                    Mechanic Cost:
                                </span>
                                <span className="font-medium text-gray-900">
                                    ${request.mechanicCost}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-semibold text-gray-900">
                                Timeline
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Created At
                                </p>
                                <p className="font-medium text-gray-900">
                                    {formatDate(request.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Receipt Image */}
                    {request.receiptImage && (
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Receipt
                            </h2>
                            <img
                                src={`${request.receiptImage}`}
                                alt="Receipt"
                                className="w-full rounded-lg border"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestDetailsPage;
