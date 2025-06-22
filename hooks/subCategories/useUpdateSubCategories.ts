import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useUpdateSubCategories = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["subCategories", "updateSubCategories"],
        mutationFn: async (data: {
            id: string;
            name: string;
            description: string;
        }) => {
            const response = await axios.put(
                `${baseUrl}/subcategories/${data.id}`,
                {
                    name: data.name,
                    description: data.description,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
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

export default useUpdateSubCategories;
