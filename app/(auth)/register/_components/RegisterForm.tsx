"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import useRegister from "@/hooks/auth/useRegister";
import { User, Mail, Lock, Phone } from "lucide-react";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
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
                    Create Your Account
                </h1>
                <span className="text-sm text-slate-400 font-normal text-center">
                    Join us today and get started
                </span>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col items-start gap-2">
                    <label
                        className="text-xs text-slate-600 font-normal text-center"
                        htmlFor="name"
                    >
                        Full Name
                    </label>
                    <div className="w-full relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            className="w-full outline-none border border-slate-100 rounded-[8px] pl-10 pr-[15px] py-[7px] text-sm text-[#222]"
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start gap-2">
                    <label
                        className="text-xs text-slate-600 font-normal text-center"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <div className="w-full relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            className="w-full outline-none border border-slate-100 rounded-[8px] pl-10 pr-[15px] py-[7px] text-sm text-[#222]"
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start gap-2">
                    <label
                        className="text-xs text-slate-600 font-normal text-center"
                        htmlFor="phoneNumber"
                    >
                        Phone Number
                    </label>
                    <div className="w-full relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            className="w-full outline-none border border-slate-100 rounded-[8px] pl-10 pr-[15px] py-[7px] text-sm text-[#222]"
                            type="tel"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col items-start gap-2 w-full">
                    <label
                        className="text-xs text-slate-600 font-normal text-center"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <div className="w-full relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            className="w-full outline-none border border-slate-100 rounded-[8px] pl-10 pr-[15px] py-[7px] text-sm text-[#222]"
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                </div>

                <button
                    disabled={isLoading || isSubmitting}
                    type="submit"
                    className="cursor-pointer px-[37px] py-[9px] text-center bg-[#222] hover:bg-[#131313] transition-all duration-300 text-white text-md font-normal rounded-[4px] my-3 disabled:opacity-25 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>

                <div className="text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-[#222] font-medium hover:underline"
                    >
                        Login here
                    </Link>
                </div>
            </form>
        </motion.div>
    );
};

export default RegisterForm;
