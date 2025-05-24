import { create } from 'zustand'
import { MentorProfileData } from '../../../types'

type State = {
    isOpen: boolean
    newMentorInfo: MentorProfileData
    avatarFile: File | null
}

type Action = {
    openModal: () => void
    closeModal: () => void
    setNewMentorInfo: (newData: Partial<MentorProfileData>) => void
    setAvatarFile: (file: File) => void
    setInitialUserInfo: (data: MentorProfileData) => void
}

export const useEditProfileModalStore = create<State & Action>()((set) => ({
    isOpen: false,
    newMentorInfo: {} as MentorProfileData,
    avatarFile: null,
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
}))
