import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export interface SubCategoryFilters {
    name?: string;
    description?: string;
}

const useGetSubCategories = (filters?: SubCategoryFilters) => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");

    // Build query parameters
    const buildQueryParams = () => {
        const params = new URLSearchParams();

        if (filters?.name) {
            params.append("name", filters.name);
        }
        if (filters?.description) {
            params.append("description", filters.description);
        }

        return params.toString();
    };

    return useQuery({
        queryKey: ["subCategories", "getSubCategories", filters],
        queryFn: async () => {
            const queryParams = buildQueryParams();
            const url = queryParams
                ? `${baseUrl}/subcategories?${queryParams}`
                : `${baseUrl}/subcategories`;

            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data.data);

            return response.data.data;
        },

        // Optional: only run if token exists
        enabled: !!token,

        // Optional: configure stale time, cache time, etc.
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export default useGetSubCategories;
