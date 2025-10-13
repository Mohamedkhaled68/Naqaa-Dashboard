import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useUpdateSubCategoriesFields = () => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["subCategories", "UpdateSubCategoriesFields"],
        mutationFn: async ({
            subCategoryId,
            fieldId,
            data,
        }: {
            subCategoryId: string;
            fieldId: string;
            data: {
                fieldName: string;
                description: string;
                isRequired: boolean;
            };
        }) => {
            const response = await axios.put(
                `${baseUrl}/subcategories/${subCategoryId}/fields/${fieldId}`,
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

export default useUpdateSubCategoriesFields;
