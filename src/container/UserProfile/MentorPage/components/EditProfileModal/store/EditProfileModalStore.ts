import { create } from 'zustand'
import { UserForMentor } from '~/api/user/types'

type State = {
    isOpen: boolean
    newMentorInfo: UserForMentor
    avatarFile: File | null
    countryCode: string
}

type Action = {
    openModal: () => void
    closeModal: () => void
    setNewMentorInfo: (newData: Partial<UserForMentor>) => void
    setAvatarFile: (file: File) => void
    setInitialUserInfo: (data: UserForMentor) => void
    setPhoneNumber: (number: string) => void
    setCountryCode: (countryCode: string) => void
}

export const useEditProfileModalStore = create<State & Action>()((set) => ({
    isOpen: false,
    newMentorInfo: {} as UserForMentor,
    avatarFile: null,
    countryCode: '',
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    setNewMentorInfo: (newData) =>
        set((state) => ({
            newMentorInfo: { ...state.newMentorInfo, ...newData },
        })),
    setAvatarFile: (file) => set({ avatarFile: file }),
    setInitialUserInfo: (data) =>
        set({
            newMentorInfo: data,
        }),
    setPhoneNumber: (number) =>
        set((state) => ({
            newMentorInfo: { ...state.newMentorInfo, phoneNumber: number },
        })),
    setCountryCode: (countryCode) => set({ countryCode }),
}))
