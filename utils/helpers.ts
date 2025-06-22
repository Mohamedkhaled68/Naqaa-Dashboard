import React from "react";

export const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
};

// Price formatting utilities for Saudi Riyal
export const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

export const formatPriceWithCurrency = (amount: number): string => {
    return `${formatPrice(amount)} Riyal`;
};

export const endcodeNationalId = (nationalId: string) => {
    return (
        nationalId.substring(0, 3) +
        "*".repeat(Math.max(0, nationalId.length - 3))
    );
};

export const extractIdFromUrl = (url: string) => {
    const regex = /\/([a-fA-F0-9]{24})/; // Matches a 24-character hex string
    const match = url.match(regex);
    return match ? match[1] : null;
};
