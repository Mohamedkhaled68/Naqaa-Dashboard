"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavigationTabsProps = {
    title: string;
    icon: React.ReactNode;
    path: string;
};

const NavigationTabs: React.FC<NavigationTabsProps> = ({
    title,
    icon,
    path,
}) => {
    const pathname = usePathname();
    const isActive = path === pathname;

    const baseClasses =
        "flex items-center gap-3 py-[10px] px-4 rounded-md transition-all duration-300 w-full outline-none";
    const activeClasses = "text-[#222] bg-white shadow-sm";
    const inactiveClasses = "bg-transparent text-white hover:bg-[#3a3a3a]";

    const classes = `${baseClasses} ${
        isActive ? activeClasses : inactiveClasses
    }`;

    return (
        <Link
            href={path}
            className={classes}
            aria-current={isActive ? "page" : undefined}
            title={title}
        >
            <span className="flex-shrink-0 ">{icon}</span>
            <span className="text-base font-medium capitalize truncate">
                {title}
            </span>
        </Link>
    );
};

export default NavigationTabs;
