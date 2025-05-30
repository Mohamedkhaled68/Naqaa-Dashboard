import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useDeleteSubCategories = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationKey: ["subCategories", "DeleteSubCategories"],
        mutationFn: async (id: string) => {
            const response = await axios.delete(
                `${baseUrl}/subcategories/${id}`,
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
                queryKey: [
                    "subCategories",
                    "getSubCategories",
                    "categories",
                    "getCategories",
                ],
            });

            // router.push("/dashboard/categories");
        },
        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useDeleteSubCategories;
