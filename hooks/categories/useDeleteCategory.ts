import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useDeleteCategory = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");
    const queryClient = useQueryClient(); // Add this

    return useMutation({
        mutationKey: ["categories", "deletecategory"],
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${baseUrl}/categories/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
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

export default useDeleteCategory;
