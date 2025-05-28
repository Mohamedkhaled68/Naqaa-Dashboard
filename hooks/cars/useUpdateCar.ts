import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Add this import

type Props = {
    id: string;
    data: Car;
};

const useUpdateCar = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");
    const router = useRouter();
    const queryClient = useQueryClient(); // Add this

    return useMutation({
        mutationKey: ["cars", "updateCar"],
        mutationFn: async ({ id, data }: Props) => {
            const response = await axios.put(`${baseUrl}/cars/${id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cars"],
            });

            router.push("/dashboard/cars");
        },

        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useUpdateCar;
