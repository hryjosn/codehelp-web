import { create } from 'zustand'

type State = {
    imageList: File[]
}
type Actions = {
    uploadImage: (imageURL: File) => void
    removeImage: (imageURL: File) => void
}
export type BookingStore = State & Actions

export const useBookingStore = create<State & Actions>()((set) => ({
    imageList: [],

    uploadImage: (imageURL: File) =>
        set((state) => ({ imageList: [...state.imageList, imageURL] })),

    removeImage: (imageURL: File) => {
        set((state) => ({
            imageList: state.imageList.filter((url) => url !== imageURL),
        }))
    },
}))
