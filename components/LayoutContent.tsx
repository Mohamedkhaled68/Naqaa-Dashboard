"use client";

import { usePathname } from "next/navigation";
import TanstackProvider from "@/providers/TanstackProvider";
import Navigationbar from "@/components/Navigationbar";
import DashNavbar from "@/components/DashNavbar";
import ModalContainer from "@/components/ModalContainer";
import { div } from "framer-motion/client";

export default function LayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage =
        pathname?.startsWith("/login") || pathname?.startsWith("/register");

    if (isAuthPage) {
        return (
            <div className="w-screen">
                <TanstackProvider>{children}</TanstackProvider>
            </div>
        );
    }

    return (
        <TanstackProvider>
            <Navigationbar />
            <main className="col-span-10 py-[35px] px-[18px] flex flex-col gap-6">
                <DashNavbar />
                {children}
            </main>
            <ModalContainer />
        </TanstackProvider>
    );
}
