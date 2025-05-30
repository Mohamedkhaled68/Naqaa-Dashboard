"use client";
import GridContainer from "@/components/GridContainer";
import OptionsBar from "@/components/OptionsBar";
import React, { useState } from "react";
import CarsTable from "./_components/CarsTable";
import { useModal } from "@/store/useModal";
import CreateCarForm from "./_components/CreateCarForm";
import useGetCars from "@/hooks/cars/useGetCars";
import { ClipLoader } from "react-spinners";

const cars = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { data: cars, isLoading } = useGetCars(searchTerm);
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
            {isLoading || !cars ? (
                <div className="text-xl font-bold flex justify-center items-center text-center p-6">
                    <ClipLoader size={50} />
                </div>
            ) : cars?.length > 0 ? (
                <CarsTable cars={cars} />
            ) : (
                <>
                    <div className="text text-center text-gray-500 text-sm py-5">
                        No cars available at the moment.
                    </div>
                </>
            )}
        </GridContainer>
    );
};

export default cars;
