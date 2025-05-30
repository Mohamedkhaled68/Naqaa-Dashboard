import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Add this import
import toast from "react-hot-toast";

type MaintenanceRecord = {
    car: string;
    driver: string;
    subCategories: string[];
    description: string;
    cost: number;
    mechanicCost: number;
    date: string; // ISO date string, can be converted to Date when needed
};

type Props = {
    id: string;
    data: MaintenanceRecord;
};

const useUpdateMaintenanceRecord = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");
    const router = useRouter();
    const queryClient = useQueryClient(); // Add this

    return useMutation({
        mutationKey: ["Maintenance", "updateMaintenance"],
        mutationFn: async ({ id, data }: Props) => {
            const response = await axios.put(
                `${baseUrl}/maintenance/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cars", "drivers", "getDriverMaintenance"],
            });
            toast.success("Maintenance record updated successfully!");
        },

        onError: (error: any) => {
            toast.error(error?.response?.data?.message);
        },
    });
};

export default useUpdateMaintenanceRecord;
