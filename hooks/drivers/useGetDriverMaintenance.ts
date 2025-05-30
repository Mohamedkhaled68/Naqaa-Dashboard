import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

interface MaintenanceRecord {
    _id: string;
    date: string;
    description: string;
    cost: number;
    car: {
        _id: string;
        brand: string;
        model: string;
    };
}

export const driverMaintenanceKeys = {
    all: ["drivers"] as const,
    maintenance: (id: string) =>
        [...driverMaintenanceKeys.all, "maintenance", id] as const,
};

const useGetDriverMaintenance = (id: string | undefined) => {
    const baseUrl = "https://srv830738.hstgr.cloud/api";
    const token = Cookies.get("token");

    return useQuery<MaintenanceRecord[], AxiosError>({
        queryKey: driverMaintenanceKeys.maintenance(id || ""),
        queryFn: async () => {
            if (!id) throw new Error("Driver ID is required");

            const response = await axios.get(
                `${baseUrl}/drivers/${id}/maintenance`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        },
        enabled: !!token && !!id,
        staleTime: 5 * 60 * 1000,
    });
};

export default useGetDriverMaintenance;
