"use client";
import GridContainer from "@/components/GridContainer";
import OptionsBar from "@/components/OptionsBar";
import useGetDrivers from "@/hooks/drivers/useGetDrivers";
import React, { useEffect, useState } from "react";
import DriversTable from "./_components/DriversTable";

const drivers = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { mutateAsync: getDrivers } = useGetDrivers();

    const fetchDrivers = async () => {
        try {
            const data = await getDrivers();

            console.log(data);
            setDrivers(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);
    return (
        <GridContainer className="flex flex-col pb-[10px]">
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
        </GridContainer>
    );
};

export default drivers;
