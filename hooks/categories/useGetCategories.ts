import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useGetCategories = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";

    return useMutation({
        mutationKey: ["categories", "getCategories"],
        mutationFn: async () => {
            const response = await axios.get(`${baseUrl}/categories`, {
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

export default useGetCategories;
