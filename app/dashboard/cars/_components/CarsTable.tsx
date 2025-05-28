"use client";
import React, { useEffect } from "react";
import CarTableRow from "./CarTableRow";
import useGetCars from "@/hooks/cars/useGetCars";
import { useCurrentCarStore } from "@/store/cars/useCurrentCarStore";

const CarsTable = () => {
    const { data: cars, isLoading } = useGetCars();
    const { clearCar } = useCurrentCarStore((state) => state);
    useEffect(() => {
        clearCar();
    }, []);
    return (
        <>
            {typeof window === "undefined" || isLoading ? (
                <div className="text-xl font-bold flex justify-center items-center text-center p-6">
                    Loading...
                </div>
            ) : cars?.length > 0 ? (
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
                            Color
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
            ) : (
                <div className="text-center text-[#4e4e4e] p-5">
                    No cars found. Please add a new car to get started.
                </div>
            )}
        </>
    );
};

export default CarsTable;
