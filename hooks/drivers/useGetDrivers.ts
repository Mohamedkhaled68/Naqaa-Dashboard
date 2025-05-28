import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useGetDrivers = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");

    return useQuery({
        queryKey: ["drivers", "getDrivers"],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/drivers`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data;
        },

        // Optional: only run if token exists
        enabled: !!token,

        // Optional: configure stale time, cache time, etc.
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export default useGetDrivers;
