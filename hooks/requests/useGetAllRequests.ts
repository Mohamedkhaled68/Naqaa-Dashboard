import { useQuery } from "@tanstack/react-query";
import { Request } from "@/types/requests";
import Cookies from "js-cookie";
import axios from "axios";

export interface RequestFilters {
    status?: string;
    startDate?: string;
    endDate?: string;
    licenseNumber?: string;
}

/**
 * Hook to fetch all maintenance requests with optional filters
 *
 * @param filters - Optional filters to apply to the request
 * @param filters.status - Filter by request status (open, accepted, rejected, underReview, completed)
 * @param filters.startDate - Filter requests from this date (YYYY-MM-DD format)
 * @param filters.endDate - Filter requests until this date (YYYY-MM-DD format)
 * @param filters.licenseNumber - Filter by driver's license number
 *
 * @example
 * // Get all requests
 * const { data: requests } = useGetAllRequests();
 *
 * // Get completed requests from July 1-15, 2025 for specific license
 * const { data: requests } = useGetAllRequests({
 *   status: 'completed',
 *   startDate: '2025-07-01',
 *   endDate: '2025-07-15',
 *   licenseNumber: '12345'
 * });
 */
const useGetAllRequests = (filters?: RequestFilters) => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");

    // Build query parameters
    const buildQueryParams = () => {
        const params = new URLSearchParams();

        if (filters?.status) {
            params.append("status", filters.status);
        }
        if (filters?.startDate) {
            params.append("startDate", filters.startDate);
        }
        if (filters?.endDate) {
            params.append("endDate", filters.endDate);
        }
        if (filters?.licenseNumber) {
            params.append("licenseNumber", filters.licenseNumber);
        }

        return params.toString();
    };

    return useQuery({
        queryKey: ["requests", filters],
        queryFn: async (): Promise<Request[]> => {
            const queryParams = buildQueryParams();
            const url = queryParams
                ? `${baseUrl}/maintenance-requests?${queryParams}`
                : `${baseUrl}/maintenance-requests`;

            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        },
    });
};

export default useGetAllRequests;
