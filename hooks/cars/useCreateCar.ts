import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export type CreateCarData = {
    plateNumber: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    // driver: string;
    status: string;
};

const useCreateCar = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";

    return useMutation({
        mutationKey: ["cars", "CreateCars"],
        mutationFn: async (data: CreateCarData) => {
            const response = await axios.post(`${baseUrl}/cars`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data.data;
        },

        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useCreateCar;
