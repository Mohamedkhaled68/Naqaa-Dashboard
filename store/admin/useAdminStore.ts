import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Admin {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface AdminStore {
    admin: Admin | null;
    setAdmin: (admin: Admin) => void;
    clearAdmin: () => void;
}

export const useAdminStore = create<AdminStore>()(
    persist(
        (set) => ({
            admin: null,
            setAdmin: (admin) => set({ admin }),
            clearAdmin: () => set({ admin: null }),
        }),
        {
            name: "admin-storage",
        }
    )
);
