import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useCreateCategory = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");

    return useMutation({
        mutationKey: ["categories", "CreateCategory"],
        mutationFn: async ({ data }: { data: { name: string } }) => {
            const response = await axios.post(`${baseUrl}/categories`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        },

        onError: (error: any) => {
            return error?.response?.data?.message;
        },
    });
};

export default useCreateCategory;
