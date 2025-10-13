import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Add this import

export type CreateCarData = {
    plateNumber: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    status: string;
};

const useCreateCar = () => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");
    const router = useRouter();
    const queryClient = useQueryClient(); // Add this

    return useMutation({
        mutationKey: ["cars", "CreateCars"],
        mutationFn: async (data: CreateCarData) => {
            const response = await axios.post(`${baseUrl}/cars`, data, {
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
            queryClient.invalidateQueries({
                queryKey: ["drivers"],
            });
        },

        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useCreateCar;
