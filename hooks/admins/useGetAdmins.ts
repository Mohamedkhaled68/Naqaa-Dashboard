import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useGetAdmins = (searchTerm?: string) => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");

    return useQuery({
        queryKey: ["admins", "getadmins", searchTerm],
        queryFn: async () => {
            const params = searchTerm ? `?search=${searchTerm}` : "";
            const response = await axios.get(`${baseUrl}/admin${params}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            
            return response.data.admins;

        },
    });
};

export default useGetAdmins;
