import { create } from 'zustand'
import { MentorProfileData } from '../../../types'

type State = {
    isOpen: boolean
    newMentorInfo: MentorProfileData
    avatarPreview: string
}

type Action = {
    openModal: () => void
    closeModal: () => void
    setNewMentorInfo: (newData: Partial<MentorProfileData>) => void
    setAvatarPreview: (url: string) => void
    initializeUserInfo: (data: MentorProfileData) => void
}

export const useEditProfileModalStore = create<State & Action>()((set) => ({
    isOpen: false,
    newMentorInfo: {} as MentorProfileData,
    avatarPreview: '',
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    setNewMentorInfo: (newData) =>
        set((state) => ({
            newMentorInfo: { ...state.newMentorInfo, ...newData },
        })),
    setAvatarPreview: (url) => set({ avatarPreview: url }),
    initializeUserInfo: (data) =>
        set({
            newMentorInfo: data,
            avatarPreview: data.avatar,
        }),
}))
