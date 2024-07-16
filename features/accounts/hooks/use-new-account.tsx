import { create } from 'zustand';

interface AccountState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNewAccount = create<AccountState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
