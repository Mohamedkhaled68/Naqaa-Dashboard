import { useModal } from "@/store/useModal";
import React from "react";
import DriverTableRow from "./DriversTableRow";

const DriversTable = ({ drivers }: { drivers: Driver[] }) => {
    const { onOpen } = useModal((state) => state);

    if (!drivers) return;
    return (
        <>
            <div className="w-full grid grid-cols-6 justify-items-center px-[42px] py-[22px] bg-[#fcfcfc]">
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Driver Name
                </div>
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    National ID
                </div>
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Address
                </div>
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    License Number
                </div>
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Phone Number
                </div>
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Car details
                </div>
            </div>
            {drivers.map((driver) => (
                <DriverTableRow
                    key={driver._id}
                    driver={driver}
                    onOpen={onOpen}
                />
            ))}
        </>
    );
};

export default DriversTable;
