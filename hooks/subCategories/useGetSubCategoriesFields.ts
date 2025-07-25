import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useGetSubCategoriesFields = (id: string | undefined) => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");
    return useQuery({
        queryKey: ["subCategories", "getSubCategoriesFields", id],
        queryFn: async () => {
            if (!id) throw new Error("Subcategory ID is required");

            const response = await axios.get(
                `${baseUrl}/subcategories/${id}/fields`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data.data);

            return response.data.data;
        }, // Disable caching
        enabled: !!token && !!id,
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });
};

export default useGetSubCategoriesFields;
