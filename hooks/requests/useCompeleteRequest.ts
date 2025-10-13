import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const completeRequest = async ({
    requestId,
    status,
}: {
    requestId: string;
    status: string;
}) => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");

    const response = await axios.patch(
        `${baseUrl}/maintenance-requests/${requestId}/complete`,
        { status },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

const useCompleteRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: completeRequest,
        onSuccess: (data) => {
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

export default useCompleteRequest;
