import { create } from 'zustand';

interface TransactionState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNewTransaction = create<TransactionState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
