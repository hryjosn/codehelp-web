import { create, createStore } from 'zustand'
import { BookingStore } from './types'

export const useBookingStore = create<BookingStore>()((set) => ({
    imageList: [],
    set,
    uploadImage: (event) => {
        const file = event.target.files![0]
        if (!file.type.startsWith('image/')) {
            alert('Only can upload image files')
            return
        }
        const fileURL = URL.createObjectURL(file)
        set((state) => ({
            imageList: [...state.imageList, fileURL],
        }))
    },
    removeImage: (imageURL) => {
        set((state) => ({
            imageList: state.imageList.filter((url) => url !== imageURL),
        }))
    },
}))
