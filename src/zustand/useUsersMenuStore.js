import { create } from "zustand";

const useUsersMenuStore = create((set) => ({
    menuIsOpen: false,
    // Toggle the menu
    toggleMenu: () => set({ menuIsOpen: !useUsersMenuStore.getState().menuIsOpen }),
    // Show the menu
    showMenu: () => set({ menuIsOpen: true }),
    // Hide the menu
    hideMenu: () => set({ menuIsOpen: false })
}));

export default useUsersMenuStore;