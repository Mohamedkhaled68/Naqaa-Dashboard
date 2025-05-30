"use client";
import React, { useEffect, useRef, useState } from "react";
import GridContainer from "./GridContainer";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/store/useModal";

const ModalContainer = () => {
    const [isScrolling, setIsScrolling] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
    const { isOpen, modalContent, onClose } = useModal((state) => state);

    // Close modal when clicking outside or pressing ESC
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscKey);
            document.body.classList.add("modal-open");
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
            document.body.classList.remove("modal-open");
        };
    }, [isOpen, onClose]);

    // Detect scrolling
    useEffect(() => {
        const content = contentRef.current;

        const handleScroll = () => {
            setIsScrolling(true);

            // Clear previous timer
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current);
            }

            // Set new timer to hide scrollbar after scrolling stops
            scrollTimerRef.current = setTimeout(() => {
                setIsScrolling(false);
            }, 1000); // Hide scrollbar after 1 second of no scrolling
        };

        if (content) {
            content.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (content) {
                content.removeEventListener("scroll", handleScroll);
            }
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current);
            }
        };
    }, [isOpen]);

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.3 },
                    }}
                    exit={{ opacity: 0, scale: 0, transition: { delay: 0.2 } }}
                    className="w-full h-screen fixed top-0 z-[10000] flex justify-center items-center bg-black/50"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 0.3, delay: 0.2 },
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="h-[90%]"
                    >
                        <div
                            ref={contentRef}
                            className={`min-w-[70%] mx-auto h-full overflow-y-scroll transition-all duration-300 bg-transparent ${
                                isScrolling
                                    ? "scrollbar-visible"
                                    : "scrollbar-hidden"
                            }`}
                        >
                            {modalContent}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
    // }
};

export default ModalContainer;
