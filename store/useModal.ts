import React from "react";
import { create } from "zustand";

interface ModalStore {
    isOpen: boolean;
    modalContent: React.ReactNode | null;
    onOpen: (modalContent: React.ReactNode | null) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    isOpen: false,
    modalContent: null,
    onOpen: (modalContent) => set({ isOpen: true, modalContent: modalContent }),
    onClose: () => set({ isOpen: false, modalContent: null }),
}));
