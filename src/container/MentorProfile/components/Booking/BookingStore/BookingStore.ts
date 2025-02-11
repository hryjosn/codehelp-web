import { create } from 'zustand'

type State = {
    imageList: string[]
}
type Actions = {
    uploadImage: (imageURL: string) => void
    removeImage: (imageURL: string) => void
}
export type BookingStore = State & Actions

export const useBookingStore = create<State & Actions>()((set) => ({
    imageList: [],

    uploadImage: (imageURL: string) =>
        set((state) => ({ imageList: [...state.imageList, imageURL] })),

    removeImage: (imageURL: string) => {
        set((state) => ({
            imageList: state.imageList.filter((url) => url !== imageURL),
        }))
    },
}))
