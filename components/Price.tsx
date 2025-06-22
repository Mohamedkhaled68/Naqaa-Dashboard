import React from "react";
import { Banknote, SaudiRiyal } from "lucide-react";
import { formatPrice } from "@/utils/helpers";

interface PriceProps {
    amount: number;
    className?: string;
    showIcon?: boolean;
    size?: "sm" | "md" | "lg";
}

const Price: React.FC<PriceProps> = ({
    amount,
    className = "",
    showIcon = true,
    size = "md",
}) => {
    const iconSizeClasses = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
    };

    return (
        <span className={`inline-flex items-center gap-1 ${className}`}>
            {showIcon && (
                <SaudiRiyal
                    className={`${iconSizeClasses[size]} text-green-600`}
                />
            )}
            <span>{formatPrice(amount)}</span>
        </span>
    );
};

export default Price;
