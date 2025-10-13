import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Add this import
import toast from "react-hot-toast";
import { driverMaintenanceKeys } from "../drivers/useGetDriverMaintenance";

interface MaintenanceRecord {
    cost: string;
    mechanicCost: string;
    date: string; // ISO date string (e.g., "2025-05-14T16:24:46.599Z")
    subCategories: string[]; // Array of subcategory IDs
    driver: string; // Driver ID
    car: string; // Car ID
    description: string;
    customFieldData?: {
        fieldName: string;
        fieldValue: string;
        subcategoryId: string;
    }[]; // Optional custom field values
}
const useCreateMaintenanceRecord = () => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");
    const router = useRouter();
    const queryClient = useQueryClient(); // Add this

    return useMutation({
        mutationKey: ["Maintenance", "updateMaintenance"],
        mutationFn: async (data: MaintenanceRecord) => {
            const { date, ...rest } = data;
            const response = await axios.post(`${baseUrl}/maintenance`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cars", ...driverMaintenanceKeys.all],
            });
            queryClient.invalidateQueries({
                queryKey: ["cars"],
            });
            queryClient.invalidateQueries({
                queryKey: ["drivers"],
            });
        },

        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useCreateMaintenanceRecord;
