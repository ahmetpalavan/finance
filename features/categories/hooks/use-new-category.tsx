import { create } from 'zustand';

interface CategoryState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNewCategory = create<CategoryState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
