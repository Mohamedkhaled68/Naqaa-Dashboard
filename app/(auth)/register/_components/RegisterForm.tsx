"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const RegisterForm = () => {
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

            <form className="flex flex-col gap-4">
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
                        placeholder="Enter email or phone"
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
                        placeholder="Enter password"
                    />
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <label
                        className="text-xs text-slate-600 font-normal text-center"
                        htmlFor="password"
                    >
                        Correct Password
                    </label>
                    <input
                        className="w-full outline-none border border-slate-100 rounded-[8px] px-[15px] py-[7px] text-sm text-[#222s]"
                        type="password"
                        placeholder="re-Enter password"
                    />
                </div>

                <button className="cursor-pointer px-[37px] py-[9px] text-center bg-[#222] hover:bg-[#131313] transition-all duration-300 text-white text-md font-normal rounded-[4px] my-3">
                    Register
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
