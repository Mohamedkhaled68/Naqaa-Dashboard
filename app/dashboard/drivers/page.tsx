"use client";
import GridContainer from "@/components/GridContainer";
import OptionsBar from "@/components/OptionsBar";
import useGetDrivers from "@/hooks/drivers/useGetDrivers";
import React, { useState } from "react";
import DriversTable from "./_components/DriversTable";

const drivers = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { data: drivers, isLoading } = useGetDrivers();

    return (
        <GridContainer className="flex flex-col pb-[10px]">
            {typeof window === undefined && isLoading ? (
                <>
                    <div className="p-4 text-center text-2xl">Loading...</div>
                </>
            ) : (
                <>
                    <OptionsBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        pageOption={
                            <div className="flex itmes-center gap-[5px]">
                                <select
                                    className="py-2 px-[12px] rounded-[5px] border border-[#D8D6DE]  text-[12px] font-normal text-[#B9B9C3] outline-none"
                                    name="status"
                                    id="status"
                                >
                                    <option value="">Select Status</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        }
                    />
                    <DriversTable drivers={drivers} />
                </>
            )}
        </GridContainer>
    );
};

export default drivers;
