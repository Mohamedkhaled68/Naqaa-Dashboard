import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useCreateSubCategoriesFields = (id: string | undefined) => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["subCategories", "createSubCategoriesFields"],
        mutationFn: async (data: {
            fieldName: string;
            description: string;
            isRequired: boolean;
        }) => {
            if (!id) throw new Error("Subcategory ID is required");

            const response = await axios.post(
                `${baseUrl}/subcategories/${id}/fields`,
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
                queryKey: ["subCategories"],
            });
        },
        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useCreateSubCategoriesFields;
