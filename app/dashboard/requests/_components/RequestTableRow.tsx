import React from "react";
import { Eye, Check, X, Clock } from "lucide-react";
import { Request } from "@/types/requests";
import { useRouter } from "next/navigation";
import useUpdateRequestStatus from "@/hooks/requests/useUpdateRequestStatus";

type RequestTableRowProps = {
    request: Request;
};

const RequestTableRow: React.FC<RequestTableRowProps> = ({ request }) => {
    const router = useRouter();
    const { mutateAsync: updateRequestStatus, isPending } =
        useUpdateRequestStatus();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
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

    const handleView = () => {
        router.push(`/dashboard/requests/${request._id}`);
    };

    const handleApprove = () => {
        console.log("Approve request:", request._id);
    };

    const handleReject = () => {
        console.log("Reject request:", request._id);
    };

    return (
        <tr
            className="hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={handleView}
        >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {request._id.slice(-8)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>
                    <div className="font-medium">{request.driver.name}</div>
                    <div className="text-gray-500 text-xs">
                        {request.driver.phoneNumber}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>
                    <div className="font-medium">
                        {request.car.brand} {request.car.model}
                    </div>
                    <div className="text-gray-500 text-xs">
                        {request.car.plateNumber}
                    </div>
                </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(request.createdAt)}
            </td>
            {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                    <button
                        onClick={handleView}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                        title="View Details"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    {request.status === "underReview" && (
                        <>
                            <button
                                onClick={handleApprove}
                                className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                title="Approve"
                            >
                                <Check className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleReject}
                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                title="Reject"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </>
                    )}
                </div>
            </td> */}
        </tr>
    );
};

export default RequestTableRow;
