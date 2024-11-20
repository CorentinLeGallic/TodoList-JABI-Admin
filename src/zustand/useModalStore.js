import { create } from "zustand";

const useModalStore = create((set) => ({
    modal: null,
    // Show the modal
    showModal: (modal) => set({ modal: modal }),
    // Hide the modal
    hideModal: () => set({ modal: null })
}));

export default useModalStore;