import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Add this import

export type CreateReceiverData = {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
};

const useCreateReceiver = () => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");
    const router = useRouter();
    const queryClient = useQueryClient(); // Add this

    return useMutation({
        mutationKey: ["receivers", "CreateReceivers"],
        mutationFn: async (data: CreateReceiverData) => {
            const response = await axios.post(`${baseUrl}/receivers`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["receivers"],
            });
        },

        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useCreateReceiver;
