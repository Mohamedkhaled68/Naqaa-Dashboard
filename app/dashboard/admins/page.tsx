"use client";
import GridContainer from "@/components/GridContainer";
import useGetAdmins from "@/hooks/admins/useGetAdmins";
import React, { useState } from "react";
import AdminsTable from "./_components/AdminsTable";
import { ClipLoader } from "react-spinners";
import OptionsBar from "@/components/OptionsBar";

const Admins = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { data: admins, isLoading } = useGetAdmins(searchTerm.trim());

    return (
        <GridContainer className="flex flex-col pb-[10px]">
            {/* <OptionsBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
            {isLoading || !admins ? (
                <div className="text-xl font-bold flex justify-center items-center text-center p-6">
                    <ClipLoader size={50} />
                </div>
            ) : admins?.length > 0 ? (
                <AdminsTable admins={admins} />
            ) : (
                <>
                    <div className="text text-center text-gray-500 text-sm py-5">
                        No admins available at the moment.
                    </div>
                </>
            )}
        </GridContainer>
    );
};

export default Admins;
