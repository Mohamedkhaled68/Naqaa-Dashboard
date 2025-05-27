"use client";
import { User } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import GridContainer from "./GridContainer";

const DashNavbar = () => {
    const pathname = usePathname();

    // Extract the last segment of the path for display
    const extractPathTitle = (path: string): string => {
        // Remove trailing slash if present
        const cleanPath = path.endsWith("/") ? path.slice(0, -1) : path;
        // Split by '/' and get the last segment
        const segments = cleanPath.split("/").filter(Boolean);
        // Get last segment or use 'Dashboard' for root
        const lastSegment =
            segments.length > 0 ? segments[segments.length - 1] : "dashboard";
        // Capitalize the first letter
        return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    };

    const displayTitle = extractPathTitle(pathname);

    return (
        <GridContainer className="w-full flex justify-between items-center pl-[47px] pr-[20px] py-[20px]">
            <h2 className="text-[#5E5873] text-[16px] font-normal capitalize">
                {displayTitle}
            </h2>
            <div className="flex gap-[14px]">
                <div className="flex flex-col items-end gap-[2px]">
                    <h1 className="text-[#6E6B7B] text-[14px] font-normal">
                        Ayman Hamdallah
                    </h1>
                    <span className="text-[#B9B9C3] text-[12px] font-normal">
                        Admin
                    </span>
                </div>
                <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center border border-[#B9B9C3]">
                    <User />
                </div>
            </div>
        </GridContainer>
    );
};

export default DashNavbar;
