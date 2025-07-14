"use client";
import GridContainer from "@/components/GridContainer";
import React from "react";
import RequestsTable from "./_components/RequestsTable";
import { useModal } from "@/store/useModal";
import useGetUnderReviewRequests from "@/hooks/requests/useGetUnderReviewRequests";
import { ClipLoader } from "react-spinners";
import { Request } from "@/types/requests";

const requests = () => {
    const { data: requests, isLoading } = useGetUnderReviewRequests();
    const { onClose, onOpen } = useModal((state) => state);

    console.log(requests);

    return (
        <GridContainer className="flex flex-col pb-[10px]">
            {isLoading || !requests ? (
                <div className="text-xl font-bold flex justify-center items-center text-center p-6">
                    <ClipLoader size={50} />
                </div>
            ) : requests && requests.length > 0 ? (
                <RequestsTable requests={requests} />
            ) : (
                <>
                    <div className="text text-center text-gray-500 text-sm py-5">
                        No requests available at the moment.
                    </div>
                </>
            )}
        </GridContainer>
    );
};

export default requests;
