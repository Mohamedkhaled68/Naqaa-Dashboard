import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Add this import

const useDeleteCar = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");
    const router = useRouter();
    const queryClient = useQueryClient(); // Add this

    return useMutation({
        mutationKey: ["cars", "deleteCar"],
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${baseUrl}/cars/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cars", "getCars"],
                exact: true,
            });

            router.push("/dashboard/cars");
        },

        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useDeleteCar;
