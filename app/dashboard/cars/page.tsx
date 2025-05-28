"use client";
import GridContainer from "@/components/GridContainer";
import OptionsBar from "@/components/OptionsBar";
import React, { useState } from "react";
import CarsTable from "./_components/CarsTable";
import { useModal } from "@/store/useModal";
import CreateCarForm from "./_components/CreateCarForm";

const cars = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { onClose, onOpen } = useModal((state) => state);

    return (
        <GridContainer className="flex flex-col pb-[10px]">
            <OptionsBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                pageOption={
                    <button
                        onClick={() => {
                            onOpen(<CreateCarForm onClose={onClose} />);
                        }}
                        className="cursor-pointer py-2 px-[38px] rounded-[5px] bg-[#222] text-[12px] font-normal text-[#fff] outline-none"
                    >
                        Add Car
                    </button>
                }
            />
            <CarsTable />
        </GridContainer>
    );
};

export default cars;
