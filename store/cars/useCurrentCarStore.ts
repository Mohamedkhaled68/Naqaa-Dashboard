import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CurrentCarStoreProps {
    car: Car | null;
    setCar: (car: Car) => void;
    clearCar: () => void;
}

export const useCurrentCarStore = create<CurrentCarStoreProps>()(
    persist(
        (set) => ({
            car: null,
            setCar: (car) => set((state) => ({ ...state, car })),
            clearCar: () => set({ car: null }),
        }),
        {
            name: "current-car-storage",
        }
    )
);
