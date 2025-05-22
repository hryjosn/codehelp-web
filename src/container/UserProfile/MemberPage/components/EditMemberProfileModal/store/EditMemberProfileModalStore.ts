import { create } from 'zustand'
import { MemberProfileData } from '~/container/UserProfile/MemberPage/types'

type State = {
    isOpen: boolean
    newMemberInfo: MemberProfileData
    avatarFile: File | null
}

type Action = {
    openModal: () => void
    closeModal: () => void
    setNewMemberInfo: (newData: Partial<MemberProfileData>) => void
    setAvatarFile: (file: File) => void
    setInitialInfo: (data: MemberProfileData) => void
}

export const useEditMemberProfileModalStore = create<State & Action>()(
    (set) => ({
        isOpen: false,
        newMemberInfo: {} as MemberProfileData,
        avatarFile: null,
        openModal: () => set({ isOpen: true }),
        closeModal: () => set({ isOpen: false }),
        setNewMemberInfo: (newData) =>
            set((state) => ({
                newMemberInfo: { ...state.newMemberInfo, ...newData },
            })),
        setAvatarFile: (url) => set({ avatarFile: url }),
        setInitialInfo: (data) =>
            set({
                newMemberInfo: data,
            }),
    })
)
