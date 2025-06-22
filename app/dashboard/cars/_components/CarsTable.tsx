"use client";
import React, { useEffect } from "react";
import CarTableRow from "./CarTableRow";
import { useCurrentCarStore } from "@/store/cars/useCurrentCarStore";

const CarsTable = ({ cars }: { cars: Car[] }) => {
    const { clearCar } = useCurrentCarStore((state) => state);
    useEffect(() => {
        clearCar();
    }, []);
    return (
        <>
            <>
                <div className="w-full grid grid-cols-6 justify-items-center px-[42px] py-[22px] bg-[#fcfcfc]">
                    <div className="text-[#4e4e4e] text-[14px] font-[700]">
                        Brand
                    </div>
                    <div className="text-[#4e4e4e] text-[14px] font-[700]">
                        Model
                    </div>
                    <div className="text-[#4e4e4e] text-[14px] font-[700]">
                        Year
                    </div>
                    <div className="text-[#4e4e4e] text-[14px] font-[700]">
                        Meter Reading
                    </div>
                    <div className="text-[#4e4e4e] text-[14px] font-[700]">
                        Plate Number
                    </div>
                    <div className="text-[#4e4e4e] text-[14px] font-[700]">
                        Car details
                    </div>
                </div>
                {cars?.map((car: Car) => (
                    <CarTableRow key={car._id} car={car} />
                ))}
            </>
        </>
    );
};

export default CarsTable;
