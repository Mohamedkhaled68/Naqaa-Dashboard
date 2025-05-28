"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import useRegister from "@/hooks/auth/useRegister";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { mutateAsync: register } = useRegister();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            setIsLoading(true);
            await register(formData);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-[60%] flex flex-col gap-3 border border-slate-100 shadow-xl px-[15px] py-[18px] rounded-[8px]"
        >
            <div className="flex flex-col items-center gap-1 mb-5">
                <h1 className="text-lg text-slate-800 font-medium text-center">
                    Create an Account
                </h1>
                <span className="text-sm text-slate-400 font-normal text-center">
                    Join us today! Sign up to get started.
                </span>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col items-start gap-2">
                    <label
                        className="text-xs text-slate-600 font-normal text-center"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        className="w-full outline-none border border-slate-100 rounded-[8px] px-[15px] py-[7px] text-sm text-[#222s]"
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter Your Name"
                    />
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label
                        className="text-xs text-slate-600 font-normal text-center"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="w-full outline-none border border-slate-100 rounded-[8px] px-[15px] py-[7px] text-sm text-[#222s]"
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                    />
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label
                        className="text-xs text-slate-600 font-normal text-center"
                        htmlFor="phoneNumber"
                    >
                        Phone Number
                    </label>
                    <input
                        className="w-full outline-none border border-slate-100 rounded-[8px] px-[15px] py-[7px] text-sm text-[#222s]"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Your Phone Number"
                    />
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label
                        className="text-xs text-slate-600 font-normal text-center"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="w-full outline-none border border-slate-100 rounded-[8px] px-[15px] py-[7px] text-sm text-[#222s]"
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                    />
                </div>

                <button
                    disabled={isLoading || isSubmitting}
                    type="submit"
                    className="cursor-pointer px-[37px] py-[9px] text-center bg-[#222] hover:bg-[#131313] transition-all duration-300 text-white text-md font-normal rounded-[4px] my-3 disabled:opacity-25 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>

            <p className="text-[14px] font-normal text-[#333] mt-3 text-center">
                Do you already have an account ?{" "}
                <Link
                    href={"/login"}
                    className="text-blue-500 cursor-pointer hover:underline"
                >
                    Login
                </Link>
            </p>
        </motion.div>
    );
};

export default RegisterForm;
