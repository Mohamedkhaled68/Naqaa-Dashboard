import type { Metadata } from "next";
import { RiUserSharedFill } from "react-icons/ri";

export const metadata: Metadata = {
    title: "Naqaa - Sign in",
    description:
        "A powerful and intuitive dashboard for managing Naqaa's services and operations efficiently.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full flex max-h-screen bg-slate-50">
            <div className="flex-1 grow h-screen flex justify-center items-center bg-[#111]">
                <RiUserSharedFill color="white" size={150} />
            </div>
            <div className="flex-1 grow h-screen">{children}</div>
        </main>
    );
}
