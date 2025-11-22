import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const useDeleteAdmin = () => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["admins", "deleteadmin"],
        mutationFn: async ({ id }: { id: string }) => {
            const response = await axios.delete(`${baseUrl}/admin/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
            toast.success("Admin deleted successfully!");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Failed to delete admin"
            );
        },
    });
};

export default useDeleteAdmin;
