import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useGetAdmin = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");

    return useMutation({
        mutationKey: ["admins", "getadmins"],
        mutationFn: async ({ id }: { id: string }) => {
            const response = await axios.get(`${baseUrl}/admin/${id}`, {
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

export default useGetAdmin;
