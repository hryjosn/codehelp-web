import { create } from 'zustand'
import { UserProfileData } from '../../../types'

type State = {
    isOpen: boolean
    newUserInfo: UserProfileData
    avatarPreview: string
}

type Action = {
    openModal: () => void
    closeModal: () => void
    setNewUserInfo: (newData: Partial<UserProfileData>) => void
    setAvatarPreview: (url: string) => void
    initializeUserInfo: (data: UserProfileData) => void
}

export const useEditProfileModalStore = create<State & Action>()((set) => ({
    isOpen: false,
    newUserInfo: {} as UserProfileData,
    avatarPreview: '',
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    setNewUserInfo: (newData) =>
        set((state) => ({
            newUserInfo: { ...state.newUserInfo, ...newData },
        })),
    setAvatarPreview: (url) => set({ avatarPreview: url }),
    initializeUserInfo: (data) =>
        set({
            newUserInfo: data,
            avatarPreview: data.avatar,
        }),
}))
