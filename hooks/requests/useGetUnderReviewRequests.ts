import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Request } from "@/types/requests";
import Cookies from "js-cookie";

const fetchRequests = async () => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");

    const response = await axios.get(
        `${baseUrl}/maintenance-requests/under-review`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data.data;
};

const useGetUnderReviewRequests = () => {
    return useQuery({
        queryKey: ["requests"],
        queryFn: () => fetchRequests(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export default useGetUnderReviewRequests;
