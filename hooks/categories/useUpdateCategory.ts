import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

type UpdateCategoryData = {
    id: string;
    data: {
        name: string;
    };
};

const useUpdateCategory = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["categories", "updateCategory"],
        mutationFn: async ({ id, data }: UpdateCategoryData) => {
            const response = await axios.put(
                `${baseUrl}/categories/${id}`,
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
                queryKey: ["categories"],
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

export default useUpdateCategory;
