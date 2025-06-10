import useGetCarById from "@/hooks/cars/useGetCarById";
import { useCurrentCarStore } from "@/store/cars/useCurrentCarStore";
import { useCurrentDriverStore } from "@/store/drivers/useCurrentDriverStore";
import { useRouter } from "next/navigation";
import React from "react";

export type DriverTableRowProps = {
    onOpen: (component: React.ReactNode) => void;
    driver: Driver;
};

const DriverTableRow = ({ driver }: DriverTableRowProps) => {
    const router = useRouter();
    const { setCar } = useCurrentCarStore((state) => state);
    const { setDriver } = useCurrentDriverStore((state) => state);
    const { data: car, isLoading } = useGetCarById(driver?.car?._id);

    const carDetailsNavigation = () => {
        if (!isLoading) {
            setCar(car);
            router.push(`/dashboard/cars/${driver?.car?._id}`);
        }
    };
    const driverDetailsNavigation = () => {
        if (!isLoading) {
            setDriver(driver);
            router.push(`/dashboard/drivers/${driver?._id}`);
        }
    };

    return (
        <div className="w-full grid grid-cols-6 justify-items-center px-[42px] py-[22px]">
            <div className="text-[#000] text-[14px] font-[400]">
                {driver.name}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {driver.nationalId}
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
                {/* <button
                    onClick={carDetailsNavigation}
                    className="py-[8px] px-[12px] rounded-[8px] bg-[#1d1d1d] text-white outline-none cursor-pointer hover:bg-primary-default/80 transition duration-300"
                >
                    More
                </button> */}
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
