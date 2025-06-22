import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useGetDriver = (id: string) => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");

    return useQuery({
        queryKey: ["drivers", "getDriver"],
        queryFn: async () => {
            const response = await axios.get(
                `${baseUrl}/drivers/${id}`,
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

        enabled: !!token,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export default useGetDriver;
