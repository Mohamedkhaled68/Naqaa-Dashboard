import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

type UpdateAdminData = {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    permissions?: string[];
};

const useUpdateAdmin = () => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["admins", "updateadmin"],
        mutationFn: async ({ id, ...data }: UpdateAdminData) => {
            const response = await axios.put(`${baseUrl}/admin/${id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
            toast.success("Admin updated successfully!");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Failed to update admin"
            );
        },
    });
};

export default useUpdateAdmin;
