import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useGetDrivers = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";

    return useMutation({
        mutationKey: ["drivers", "getDrivers"],
        mutationFn: async () => {
            const response = await axios.get(`${baseUrl}/drivers`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data.data;
        },

        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useGetDrivers;
