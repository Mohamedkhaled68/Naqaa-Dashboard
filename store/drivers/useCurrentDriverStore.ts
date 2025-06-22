import { create } from "zustand";
import { persist } from "zustand/middleware";
type Car = {
    _id: string;
    plateNumber: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    status: "available" | "unavailable" | string; // Adjust based on all possible statuses
    meterReading: number;
    createdAt: string; // or Date if you'll parse it
    updatedAt: string; // or Date if you'll parse it
};
type Driver = {
    _id: string;
    name: string;
    car: Car | null; // Assuming a driver can have a car or not
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
