"use client";
import { useEffect } from "react";

const Page = () => {
    useEffect(() => {
        const token = document.cookie
            .split(";")
            .find((c) => c.trim().startsWith("token="));

        if (token) {
            // If token exists, redirect to dashboard
            window.location.href = "/dashboard";
        } else {
            // If no token, redirect to login
            window.location.href = "/login";
        }
    }, []);

    return null; // Return null since this is just a router component
};

export default Page;
