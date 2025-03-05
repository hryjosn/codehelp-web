import { create } from 'zustand'

type State = {
    isOpen: boolean
}

type Action = {
    openModal: () => void
    closeModal: () => void
}

export const useEditBookingInfoModalStore = create<State & Action>()((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}))
