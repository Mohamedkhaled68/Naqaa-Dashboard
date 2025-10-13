import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useCreateSubCategories = () => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationKey: ["subCategories", "createSubCategories"],
        mutationFn: async (data: {
            name: string;
            category: string;
            description: string;
        }) => {
            const response = await axios.post(
                `${baseUrl}/subcategories`,
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
                queryKey: ["categories", "getCategories"],
            });
        },
        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useCreateSubCategories;
