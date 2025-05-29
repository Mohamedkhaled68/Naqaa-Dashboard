import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/store/admin/useAdminStore";
import toast from "react-hot-toast";

export type UserLoginData = {
    email: string;
    password: string;
};

const useLogin = () => {
    const router = useRouter();
    const setAdmin = useAdminStore((state) => state.setAdmin);

    const baseUrl = "https://srv830738.hstgr.cloud/api";
    return useMutation({
        mutationKey: ["auth", "login"],
        mutationFn: async (data: UserLoginData) => {
            const response = await axios.post(`${baseUrl}/admin/login`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

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
            toast.success("Logged in Successfully!");
            router.push("/dashboard");
        },
        onError: (error: any) => {
            return toast.error(error?.response?.data?.message);
        },
    });
};

export default useLogin;
