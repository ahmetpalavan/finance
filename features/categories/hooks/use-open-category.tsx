import { create } from 'zustand';

interface CategoryState {
  id?: string;
  open: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useOpenCategory = create<CategoryState>((set) => ({
  id: undefined,
  open: false,
  onOpen: (id: string) => set({ id, open: true }),
  onClose: () => set({ open: false, id: undefined }),
}));
