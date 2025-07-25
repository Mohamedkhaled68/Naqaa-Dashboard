import React from "react";
import { useRouter } from "next/navigation";
import { useCurrentCarStore } from "@/store/cars/useCurrentCarStore";
import { formatDate, formatDateForInput } from "@/utils/helpers";

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

    // Determine row styling based on oil change requirement
    const getRowStyling = () => {
        if (car.oilMustChange) {
            return "w-full grid grid-cols-8 justify-items-center px-[42px] py-[22px] bg-red-50 border-l-4 border-red-500 hover:bg-red-100 transition-colors";
        }
        return "w-full grid grid-cols-8 justify-items-center px-[42px] py-[22px] hover:bg-gray-50 transition-colors";
    };

    const getTextStyling = (isMainText = false) => {
        if (car.oilMustChange) {
            return isMainText
                ? "text-red-800 text-[14px] font-[600]"
                : "text-red-600 text-[14px] font-[400]";
        }
        return isMainText
            ? "text-[#000] text-[14px] font-[400]"
            : "text-[#6E6B7B] text-[14px] font-[400]";
    };

    return (
        <div className={getRowStyling()}>
            {car.oilMustChange && (
                <div className="col-span-8 mb-2 px-2">
                    <div className="flex items-center space-x-2 bg-red-100 border border-red-300 rounded-md px-3 py-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-800 text-xs font-medium">
                            🔧 Oil Change Required - Current: {car.meterReading}{" "}
                            km / Next Service: {car.oilChangeReminderKM} km
                        </span>
                    </div>
                </div>
            )}
            <div className={getTextStyling(true)}>{car.brand}</div>
            <div className={getTextStyling()}>{car.model}</div>
            <div className={getTextStyling()}>{car.oilChangeReminderKM} km</div>
            <div className={getTextStyling()}>{car.meterReading} km</div>
            <div className={getTextStyling()}>
                {car.insuranceDate
                    ? formatDateForInput(car.insuranceDate)
                    : "--"}
            </div>
            <div className={getTextStyling()}>
                {car.examinationDate
                    ? formatDateForInput(car.examinationDate)
                    : "--"}
            </div>
            <div className={getTextStyling()}>{car.plateNumber}</div>

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
