import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useDeleteDriver = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationKey: ["drivers", "deleteDriver"],
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${baseUrl}/drivers/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["drivers", "getDrivers"],
            });

            router.push("/dashboard/drivers");
        },
        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useDeleteDriver;
