import React from "react";
import { useRouter } from "next/navigation";
import { useCurrentCarStore } from "@/store/cars/useCurrentCarStore";

export type CarTableRowProps = {
    car: Car;
};

const CarTableRow = ({ car }: CarTableRowProps) => {
    const router = useRouter();
    const { setCar } = useCurrentCarStore((state) => state);

    const handleBrandClick = () => {
        setCar(car);
        router.push(`/dashboard/cars/${car._id}`);
    };
    return (
        <div className="w-full grid grid-cols-6 justify-items-center px-[42px] py-[22px]">
            <div className="text-[#000] text-[14px] font-[400]">
                {car.brand}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {car.model}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {car.year}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {car.meterReading} km
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[600]">
                {car.plateNumber}
            </div>

            <div className="more">
                <button
                    onClick={handleBrandClick}
                    className="py-[8px] px-[12px] rounded-[8px] bg-[#1d1d1d] text-white outline-none cursor-pointer hover:bg-primary-default/80 transition duration-300"
                >
                    More
                </button>
            </div>
        </div>
    );
};

export default CarTableRow;
