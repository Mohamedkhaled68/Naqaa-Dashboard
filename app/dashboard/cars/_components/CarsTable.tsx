import { useModal } from "@/store/useModal";
import React from "react";
import CarTableRow from "./CarTableRow";

const CarsTable = ({ cars }: { cars: Car[] }) => {
    const { onOpen } = useModal((state) => state);
    return (
        <>
            <div className="w-full grid grid-cols-7 justify-items-center px-[42px] py-[22px] bg-[#fcfcfc]">
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
                    Status
                </div>
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Car details
                </div>
            </div>
            {cars.map((car) => (
                <CarTableRow key={car._id} car={car} onOpen={onOpen} />
            ))}
        </>
    );
};

export default CarsTable;
