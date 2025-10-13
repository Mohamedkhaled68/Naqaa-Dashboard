import { useQuery } from "@tanstack/react-query";
import { Request } from "@/types/requests";
import Cookies from "js-cookie";
import axios from "axios";

const useGetRequestById = (requestId: string) => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");
    return useQuery({
        queryKey: ["request", requestId],
        queryFn: async (): Promise<Request> => {
            const response = await axios.get(
                `${baseUrl}/maintenance-requests/${requestId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        },
        enabled: !!requestId,
    });
};

export default useGetRequestById;
