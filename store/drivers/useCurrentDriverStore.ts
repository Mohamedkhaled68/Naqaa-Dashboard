import { create } from "zustand";
import { persist } from "zustand/middleware";

type Driver = {
    _id: string;
    name: string;
    phoneNumber: string;
    nationalId: string;
    licenseNumber: string;
    address: string;
};

interface CurrentDriverStoreProps {
    driver: Driver | null;
    setDriver: (driver: Driver) => void;
    clearDriver: () => void;
}

export const useCurrentDriverStore = create<CurrentDriverStoreProps>()(
    persist(
        (set) => ({
            driver: null,
            setDriver: (driver) => set((state) => ({ ...state, driver })),
            clearDriver: () => set({ driver: null }),
        }),
        {
            name: "current-driver-storage",
        }
    )
);
