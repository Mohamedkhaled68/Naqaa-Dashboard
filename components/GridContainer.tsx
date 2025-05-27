import React from "react";

const GridContainer = ({
    children,
    className,
    ref,
}: {
    children: React.ReactNode;
    className?: string;
    ref?: React.RefObject<HTMLDivElement | null>;
}) => {
    return (
        <div
            ref={ref}
            className={`rounded-[6px] bg-white shadow-sm ${className}`}
        >
            {children}
        </div>
    );
};

export default GridContainer;
