import { create } from 'zustand'
import { MemberProfileData } from '~/container/UserProfile/MemberPage/types'

type State = {
    isOpen: boolean
    newMemberInfo: MemberProfileData
    avatarPreview: string
}

type Action = {
    openModal: () => void
    closeModal: () => void
    setNewMemberInfo: (newData: Partial<MemberProfileData>) => void
    setAvatarPreview: (url: string) => void
    setInitialInfo: (data: MemberProfileData) => void
}

export const useEditMemberProfileModalStore = create<State & Action>()(
    (set) => ({
        isOpen: false,
        newMemberInfo: {} as MemberProfileData,
        avatarPreview: '',
        openModal: () => set({ isOpen: true }),
        closeModal: () => set({ isOpen: false }),
        setNewMemberInfo: (newData) =>
            set((state) => ({
                newMemberInfo: { ...state.newMemberInfo, ...newData },
            })),
        setAvatarPreview: (url) => set({ avatarPreview: url }),
        setInitialInfo: (data) =>
            set({
                newMemberInfo: data,
                avatarPreview: String(data.avatar),
            }),
    })
)
