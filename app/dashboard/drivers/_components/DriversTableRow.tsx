import useGetCarById from "@/hooks/cars/useGetCarById";
import useGetDriver from "@/hooks/drivers/useGetDriver";
import { useCurrentCarStore } from "@/store/cars/useCurrentCarStore";
import { useCurrentDriverStore } from "@/store/drivers/useCurrentDriverStore";
import { endcodeNationalId } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import React from "react";

export type DriverTableRowProps = {
    onOpen: (component: React.ReactNode) => void;
    driver: Driver;
};

const DriverTableRow = ({ driver }: DriverTableRowProps) => {
    const { setDriver } = useCurrentDriverStore((state) => state);
    const router = useRouter();

    const driverDetailsNavigation = async () => {
        setDriver(driver);
        router.push(`/dashboard/drivers/${driver._id}`);
    };

    return (
        <div className="w-full grid grid-cols-6 justify-items-center px-[42px] py-[22px]">
            <div className="text-[#000] text-[14px] font-[400]">
                {driver.name}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {endcodeNationalId(driver.nationalId)}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[600]">
                {driver.address ? driver.address : "--"}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {driver.licenseNumber}
            </div>

            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {driver.phoneNumber}
            </div>
            <div className="more">
                <button
                    onClick={driverDetailsNavigation}
                    className="py-[8px] px-[12px] rounded-[8px] bg-[#1d1d1d] text-white outline-none cursor-pointer hover:bg-primary-default/80 transition duration-300"
                >
                    More
                </button>
            </div>
        </div>
    );
};

export default DriverTableRow;
