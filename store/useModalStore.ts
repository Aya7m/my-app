import { create } from "zustand";

interface ModalState {
  isSignInOpen: boolean;
  isSearchOpen: boolean;
  openSignIn: () => void;
  openSearch: () => void;
  closeSignIn: () => void;
  closeSearch: () => void;
  closeAll: () => void;
}

export const useModalState = create<ModalState>((set) => ({
  isSearchOpen: false,
  isSignInOpen: false,
  openSignIn: () => set({ isSearchOpen: false, isSignInOpen: true }),
  openSearch: () => set({ isSearchOpen: true, isSignInOpen: false }),
  closeSignIn: () => set({ isSignInOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
  closeAll: () => set({ isSearchOpen: false, isSignInOpen: false }),
}));
