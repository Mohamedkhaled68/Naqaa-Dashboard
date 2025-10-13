import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useDeleteSubCategoriesFields = () => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["subCategories", "DeleteSubCategoriesFields"],
        mutationFn: async ({
            subCategoryId,
            fieldId,
        }: {
            subCategoryId: string;
            fieldId: string;
        }) => {
            const response = await axios.delete(
                `${baseUrl}/subcategories/${subCategoryId}/fields/${fieldId}`,
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

export default useDeleteSubCategoriesFields;
