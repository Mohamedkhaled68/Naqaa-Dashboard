import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useTotalGetDrivers = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");

    return useQuery({
        queryKey: ["drivers", "getTotalDrivers"],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/drivers/total`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.totalDrivers;
        },

        // Optional: only run if token exists
        enabled: !!token,

        // Optional: configure stale time, cache time, etc.
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export default useTotalGetDrivers;
