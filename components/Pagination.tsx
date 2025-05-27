"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

type PaginationProps = {
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ setCurrentPage, totalPages }: PaginationProps) => {
    const [activePage, setActivePage] = useState(0); // 0-based index

    const handleSpanClick = (index: number) => {
        setActivePage(index);
    };

    const handlePrev = () => {
        if (activePage > 0) {
            setActivePage((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (activePage < totalPages - 1) {
            setActivePage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        setCurrentPage(activePage + 1);
    }, [activePage]);

    return (
        <div className="flex justify-center items-center w-[250px] h-[28px] gap-1 self-end mr-5 select-none mt-[20px]">
            {/* Left Arrow */}
            <div
                onClick={handlePrev}
                className={`w-[28px] h-[28px] rounded-full flex justify-center items-center ${
                    activePage === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#F3F2F7] text-button-orange cursor-pointer"
                }`}
            >
                <ChevronLeft size={18} />
            </div>

            {/* Page Numbers */}
            <div className="rounded-[16px] py-[5px] px-[14px] flex items-center gap-[15px] bg-[#F3F2F7]">
                {Array(totalPages)
                    .fill(null)
                    .map((_, index) => (
                        <span
                            key={index}
                            onClick={() => handleSpanClick(index)}
                            className={`transition-all duration-300 text-[12px] font-normal z-10 text-[#6E6B7B] relative cursor-pointer ${
                                activePage === index
                                    ? "text-white mx-2 text-[16px] font-bold"
                                    : ""
                            }`}
                        >
                            {index + 1}
                            <span
                                className={`indecator ${
                                    activePage === index
                                        ? "transition-all duration-300 z-[-1] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-tertiary-600 text-white rounded-full w-[35px] h-[35px] flex justify-center items-center"
                                        : "transition-all duration-300"
                                }`}
                            />
                        </span>
                    ))}
            </div>

            {/* Right Arrow */}
            <div
                onClick={handleNext}
                className={`w-[28px] h-[28px] rounded-full flex justify-center items-center ${
                    activePage === totalPages - 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#F3F2F7] text-button-orange cursor-pointer"
                }`}
            >
                <ChevronRight size={18} />
            </div>
        </div>
    );
};

export default Pagination;
