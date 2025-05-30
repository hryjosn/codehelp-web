import { create } from 'zustand'
import { MentorProfileData } from '../../../types'

type State = {
    isOpen: boolean
    newMentorInfo: MentorProfileData
    avatarFile: File | null
    countryCode: string
}

type Action = {
    openModal: () => void
    closeModal: () => void
    setNewMentorInfo: (newData: Partial<MentorProfileData>) => void
    setAvatarFile: (file: File) => void
    setInitialUserInfo: (data: MentorProfileData) => void
    setPhoneNumber: (number: string) => void
    setCountryCode: (countryCode: string) => void
}

export const useEditProfileModalStore = create<State & Action>()((set) => ({
    isOpen: false,
    newMentorInfo: {} as MentorProfileData,
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
