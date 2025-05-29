import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useGetCategoryById = (id: string) => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");

    return useQuery({
        queryKey: ["categories", "getCategoryId", id],
        queryFn: async ({ queryKey }) => {
            const categoryId = queryKey[2] as string;

            const response = await axios.get(
                `${baseUrl}/categories/${categoryId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data.data);

            return response.data.data;
        },

        // Optional: only run if token exists
        enabled: !!token && !!id,

        // Optional: configure stale time, cache time, etc.
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export default useGetCategoryById;
