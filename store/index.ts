import {create} from "zustand";

interface Store {
  isOpen: boolean;
  toggle: () => void;
}

export const useTracker = create<Store>((set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export const useSidebar = create<Store>(set => ({
  isOpen: false,
  toggle: () => set(state => ({ isOpen: !state.isOpen })),
}))