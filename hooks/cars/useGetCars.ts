import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useGetCars = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";

    return useMutation({
        mutationKey: ["cars", "gatCars"],
        mutationFn: async () => {
            const response = await axios.get(`${baseUrl}/cars`, {
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

export default useGetCars;
