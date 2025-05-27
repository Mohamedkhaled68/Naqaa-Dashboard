import React from "react";

export type DriverTableRowProps = {
    onOpen: (component: React.ReactNode) => void;
    driver: Driver;
};

const DriverTableRow = ({ driver, onOpen }: DriverTableRowProps) => {
    return (
        <div className="w-full grid grid-cols-6 justify-items-center px-[42px] py-[22px]">
            <div className="text-[#000] text-[14px] font-[400]">
                {driver.name}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {driver.nationalId}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[600]">
                {driver.address}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {driver.licenseNumber}
            </div>

            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {driver.phoneNumber}
            </div>
            <div className="more">
                <button
                    // onClick={() => onOpen(<OrderDetails />)}
                    className="py-[8px] px-[12px] rounded-[8px] bg-[#1d1d1d] text-white outline-none cursor-pointer hover:bg-primary-default/80 transition duration-300"
                >
                    More
                </button>
            </div>
        </div>
    );
};

export default DriverTableRow;
