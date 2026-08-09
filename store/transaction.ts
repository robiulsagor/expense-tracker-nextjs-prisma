import { create } from "zustand";

type TransactionStore = {
  selectedTransactionId: number | null;
  isDetailViewOpen: boolean;
  openDetails: (id: number | null) => void;
  closeDetails: () => void;
  showDeleteModal: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  selectedTransactionId: null,
  isDetailViewOpen: false,
  openDetails: (id: number | null) =>
    set({
      selectedTransactionId: id,
      isDetailViewOpen: true,
    }),
  closeDetails: () =>
    set({
      selectedTransactionId: null,
      isDetailViewOpen: false,
    }),

    showDeleteModal: false,
    openDeleteModal: () => set({ showDeleteModal: true, }),
    closeDeleteModal: () => set({ showDeleteModal: false }),
}));
