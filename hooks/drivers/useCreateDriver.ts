import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

type Driver = {
    name: string;
    phoneNumber: string;
    nationalId: string;
    licenseNumber: string;
    address: string;
};

const useCreateDriver = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");

    const queryClient = useQueryClient(); // Add this

    return useMutation({
        mutationKey: ["drivers", "CreateDriver"],
        mutationFn: async (data: Driver) => {
            const response = await axios.post(
                `${baseUrl}/drivers/create-driver`,
                data,
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
                queryKey: ["drivers", "getDrivers"],
            });
        },
        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useCreateDriver;
