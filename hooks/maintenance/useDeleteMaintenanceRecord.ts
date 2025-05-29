import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useDeleteMaintenanceRecord = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["Maintenance", "DeleteMaintenance"],
        mutationFn: async (id: string) => {
            const response = await axios.delete(
                `${baseUrl}/maintenance/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cars"],
            });
        },

        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useDeleteMaintenanceRecord;
