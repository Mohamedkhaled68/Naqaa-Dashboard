import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type UpdateDriverData = {
    name: string;
    phoneNumber: string;
    nationalId: string;
    licenseNumber: string;
    address?: string;
};

const useUpdateDriver = (id: string) => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");
    const router = useRouter();

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["drivers", "UpdateDriver"],
        mutationFn: async (data: UpdateDriverData) => {
            const response = await axios.put(`${baseUrl}/drivers/${id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["drivers"],
            });
            queryClient.invalidateQueries({
                queryKey: ["getDrivers"],
            });
            queryClient.invalidateQueries({
                queryKey: ["getDriver"],
            });

            router.push("/dashboard/drivers");
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                "Failed to update driver. Please try again.";
            toast.error(errorMessage);
        },
    });
};

export default useUpdateDriver;
