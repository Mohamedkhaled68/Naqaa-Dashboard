import { create } from "zustand";
import { persist } from "zustand/middleware";

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
