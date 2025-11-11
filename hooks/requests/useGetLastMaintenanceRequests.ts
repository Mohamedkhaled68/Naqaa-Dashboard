import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import axios from "axios";

export interface MaintenanceRecord {
    _id: string;
    car: {
        _id: string;
        plateNumber: string;
        brand: string;
        model: string;
        year: number;
        color: string;
        status: string;
        meterReading: number;
    };
    driver: {
        _id: string;
        name: string;
        phoneNumber: string;
        nationalId: string;
        licenseNumber: string;
    };
    subCategories: Array<{
        _id: string;
        name: string;
        description: string;
        category: {
            _id: string;
            name: string;
        };
    }>;
    description: string;
    cost: number;
    mechanicCost: number;
    customFieldData: Array<{
        fieldName: string;
        fieldValue: string;
        subcategoryId: string;
        _id: string;
    }>;
    date: string;
}

export interface DashboardHistoryResponse {
    status: string;
    data: {
        recentMaintenanceRecords: {
            results: number;
            data: MaintenanceRecord[];
        };
        recentCompletedRequests: {
            results: number;
            data: any[];
        };
        statistics: {
            totalStats: {
                _id: null;
                totalRecords: number;
                totalCost: number;
                totalMechanicCost: number;
                avgCost: number;
                avgMechanicCost: number;
            };
            recentActivity: {
                maintenanceRecordsLast30Days: number;
                completedRequestsLast30Days: number;
            };
        };
    };
}

/**
 * Hook to fetch dashboard maintenance history including recent records and statistics
 *
 * @example
 * const { data, isLoading } = useGetLastMaintenanceRequests();
 * const records = data?.data.recentMaintenanceRecords.data;
 * const stats = data?.data.statistics;
 */
const useGetLastMaintenanceRequests = () => {
    const baseUrl = "https://api.modev.me/api";
    const token = Cookies.get("token");

    return useQuery({
        queryKey: ["lastMaintenanceRequests"],
        queryFn: async () => {
            const { data } = await axios.get<DashboardHistoryResponse>(
                `${baseUrl}/maintenance/dashboard/history`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return data;
        },
        enabled: !!token,
    });
};

export default useGetLastMaintenanceRequests;
