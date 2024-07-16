import { create } from 'zustand';

interface AccountState {
  id?: string;
  open: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useOpenAccount = create<AccountState>((set) => ({
  id: undefined,
  open: false,
  onOpen: (id: string) => set({ id, open: true }),
  onClose: () => set({ open: false, id: undefined }),
}));
