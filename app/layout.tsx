import type { Metadata } from "next";
import LayoutContent from "@/components/LayoutContent";
import "./globals.css";

export const metadata: Metadata = {
    title: "Naqaa - Dashboard",
    description:
        "A powerful and intuitive dashboard for managing Naqaa's services and operations efficiently.",
    icons: {
        icon: "/logo.svg",
        shortcut: "/logo.svg",
        apple: "/logo.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className="w-full min-h-screen grid grid-cols-12 relative"
                cz-shortcut-listen="true"
            >
                <LayoutContent>{children}</LayoutContent>
            </body>
        </html>
    );
}
