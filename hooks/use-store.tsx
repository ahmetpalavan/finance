import { create } from 'zustand';

interface AppState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const useStore = create<AppState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));

export default useStore;
