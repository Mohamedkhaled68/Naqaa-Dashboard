import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const updateRequestStatus = async ({
    requestId,
    status,
}: {
    requestId: string;
    status: string;
}) => {
    // Replace with actual API call
    // const response = await axios.patch(`/api/requests/${requestId}`, { status });
    // return response.data;

    // Mock implementation
    console.log(`Updating request ${requestId} to status: ${status}`);
    return { success: true, message: `Request ${status} successfully` };
};

const useUpdateRequestStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateRequestStatus,
        onSuccess: (data, variables) => {
            toast.success(data.message);
            // Invalidate and refetch requests
            queryClient.invalidateQueries({ queryKey: ["requests"] });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                    "Failed to update request status"
            );
        },
    });
};

export default useUpdateRequestStatus;
