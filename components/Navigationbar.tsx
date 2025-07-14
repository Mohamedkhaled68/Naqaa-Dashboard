import React from "react";
import { Car, House, LogOut, FileText } from "lucide-react";
import { LiaIdCard } from "react-icons/lia";
import NavigationTabs from "./NavigationTabs";
import { BiCategory } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAdminStore } from "@/store/admin/useAdminStore";
import toast from "react-hot-toast";
const tabs: any = [
    {
        title: "dashboard",
        icon: <House />,
        path: "/dashboard",
    },
    {
        title: "drivers",
        icon: <LiaIdCard />,
        path: "/dashboard/drivers",
    },
    {
        title: "cars",
        icon: <Car />,
        path: "/dashboard/cars",
    },
    {
        title: "categories",
        icon: <BiCategory />,
        path: "/dashboard/categories",
    },
    {
        title: "requests",
        icon: <FileText />,
        path: "/dashboard/requests",
    },
];

const Navigationbar = () => {
    const router = useRouter();
    const clearAdmin = useAdminStore((state) => state.clearAdmin);

    const handleLogout = () => {
        // Remove token from cookies
        Cookies.remove("token");

        // Clear admin store
        clearAdmin();

        toast.success("Logged out Successfully!");
        // Redirect to login
        router.push("/login");
    };
    return (
        <div className="bg-[#222] text-white text-lg text-center p-5 h-screen col-span-2 sticky top-0">
            <div className="h-full w-full px-[15px] pt-[25px] flex flex-col gap-[63px]">
                <div className="overflow-hidden px-[15px]">
                    {/* <AmenLogo className="w-[100px] h-[50px]" /> */}
                    <h1 className="text-4xl text-white font-medium">Naqaa</h1>
                </div>
                <div className="flex flex-col gap-4">
                    {tabs.map((tab: any) => (
                        <NavigationTabs
                            key={tab.title}
                            title={tab.title}
                            icon={tab.icon}
                            path={tab.path}
                        />
                    ))}
                </div>
                <div className="flex">
                    <div
                        onClick={handleLogout}
                        className="bg-transparent hover:bg-[#3a3a3a] text-primary-default flex items-center gap-[12px] py-[10px] px-[15px] cursor-pointer rounded-[4px] hover:bg-primary-default hover:text-white transition duration-300 w-full"
                    >
                        <LogOut color="#B90000" />
                        <h2 className="text-[15px] font-[500] capitalize">
                            Logout
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigationbar;
