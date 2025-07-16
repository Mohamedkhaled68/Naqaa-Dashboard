import { useQuery } from "@tanstack/react-query";
import { Request } from "@/types/requests";
import Cookies from "js-cookie";
import axios from "axios";

const useGetAllReceivers = () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");
    return useQuery({
        queryKey: ["receivers"],
        queryFn: async (): Promise<Request> => {
            const response = await axios.get(
                `${baseUrl}/receivers`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        },
    });
};

export default useGetAllReceivers;
