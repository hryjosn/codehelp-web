import { create } from 'zustand'

type State = {
    isOpen: boolean
    imageURL: string
}

type Action = {
    setImageURL: (url: string) => void
    openModal: () => void
    closeModal: () => void
}

export const useImageModalStore = create<State & Action>()((set) => ({
    isOpen: false,
    imageURL: '',
    setImageURL: (url) => set({ imageURL: url }),
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}))
