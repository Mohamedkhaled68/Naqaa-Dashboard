"use client";
import GridContainer from "@/components/GridContainer";
import OptionsBar from "@/components/OptionsBar";
import useGetDrivers from "@/hooks/drivers/useGetDrivers";
import React, { useState } from "react";
import DriversTable from "./_components/DriversTable";
import { ClipLoader } from "react-spinners";
import { useModal } from "@/store/useModal";
import CreateDriverForm from "./_components/CreateDriverForm";
import { useCanAddDriver } from "@/utils/permissions";

const drivers = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { data: drivers, isLoading } = useGetDrivers(searchTerm.trim());
    const { onOpen, onClose } = useModal();
    const canAddDriver = useCanAddDriver();

    return (
        <GridContainer className="flex flex-col pb-[10px]">
            <OptionsBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                pageOption={
                    canAddDriver ? (
                        <button
                            onClick={() => {
                                onOpen(<CreateDriverForm onClose={onClose} />);
                            }}
                            className="cursor-pointer py-2 px-[38px] rounded-[5px] bg-[#222] text-[12px] font-normal text-[#fff] outline-none"
                        >
                            Add Driver
                        </button>
                    ) : null
                }
            />
            {isLoading || !drivers ? (
                <div className="text-xl font-bold flex justify-center items-center text-center p-6">
                    <ClipLoader size={50} />
                </div>
            ) : drivers?.length > 0 ? (
                <DriversTable drivers={drivers} />
            ) : (
                <>
                    <div className="text text-center text-gray-500 text-sm py-5">
                        No drivers available at the moment.
                    </div>
                </>
            )}
        </GridContainer>
    );
};

export default drivers;
