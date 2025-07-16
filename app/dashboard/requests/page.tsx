"use client";
import GridContainer from "@/components/GridContainer";
import React, { useState } from "react";
import RequestsTable from "./_components/RequestsTable";
import { useModal } from "@/store/useModal";
import useGetUnderReviewRequests from "@/hooks/requests/useGetUnderReviewRequests";
import { ClipLoader } from "react-spinners";
import { Request } from "@/types/requests";
import useGetAllRequests, {
    RequestFilters,
} from "@/hooks/requests/useGetAllRequests";
import OptionsBar from "@/components/OptionsBar";
import RequestsFilter from "./_components/RequestsFilter";

const requests = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filters, setFilters] = useState<RequestFilters>({});

    const { data: requests, isLoading } = useGetAllRequests(filters);
    const { onClose, onOpen } = useModal((state) => state);

    const handleFiltersChange = (newFilters: RequestFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({});
    };

    // Filter requests by search term (client-side filtering for search)
    const filteredRequests = requests?.filter((request) => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();
        return (
            request.driver?.name?.toLowerCase().includes(searchLower) ||
            request.driver?.phoneNumber?.toLowerCase().includes(searchLower) ||
            request.car?.plateNumber?.toLowerCase().includes(searchLower) ||
            request.car?.model?.toLowerCase().includes(searchLower) ||
            request.car?.brand?.toLowerCase().includes(searchLower) ||
            request.status?.toLowerCase().includes(searchLower) ||
            request.description?.toLowerCase().includes(searchLower)
        );
    });

    console.log(requests);

    return (
        <GridContainer className="flex flex-col pb-[10px]">
            <RequestsFilter
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
            />
            {isLoading || !requests ? (
                <div className="text-xl font-bold flex justify-center items-center text-center p-6">
                    <ClipLoader size={50} />
                </div>
            ) : filteredRequests && filteredRequests.length > 0 ? (
                <RequestsTable requests={filteredRequests} />
            ) : (
                <>
                    <div className="text text-center text-gray-500 text-sm py-5">
                        {requests && requests.length > 0
                            ? "No requests match your search criteria."
                            : "No requests available at the moment."}
                    </div>
                </>
            )}
        </GridContainer>
    );
};

export default requests;
