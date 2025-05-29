import { useAdminStore } from "@/store/admin/useAdminStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Add this import
import toast from "react-hot-toast";

export type UserRegisterData = {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
};

const useRegister = () => {
    const router = useRouter(); // Add this
    const setAdmin = useAdminStore((state) => state.setAdmin);

    const baseUrl = "https://srv830738.hstgr.cloud/api";
    return useMutation({
        mutationKey: ["auth", "register"],
        mutationFn: async (data: UserRegisterData) => {
            const response = await axios.post(
                `${baseUrl}/admin/register`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Save token in cookies
            if (response.data.token) {
                Cookies.set("token", response.data.token, {
                    expires: 7,
                    secure: true,
                    sameSite: "strict",
                });
            }

            // Store admin data in Zustand store
            if (response.data.admin) {
                setAdmin(response.data.admin);
            }
            return response.data;
        },
        onSuccess: () => {
            toast.success("Registered Successfully!");

            router.push("/dashboard");
        },
        onError: (error: any) => {
            return toast.error(error?.response?.data?.message);
        },
    });
};

export default useRegister;
