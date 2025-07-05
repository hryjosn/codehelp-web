import { create } from 'zustand'
import { UserForMember } from '~/api/user/types'

type State = {
    isOpen: boolean
    newMemberInfo: UserForMember
    avatarFile: File | null
    countryCode: string
}

type Action = {
    openModal: () => void
    closeModal: () => void
    setNewMemberInfo: (newData: Partial<UserForMember>) => void
    setAvatarFile: (file: File) => void
    setInitialInfo: (data: UserForMember) => void
    setPhoneNumber: (number: string) => void
    setCountryCode: (countryCode: string) => void
}

export const useEditMemberProfileModalStore = create<State & Action>()(
    (set) => ({
        isOpen: false,
        newMemberInfo: {} as UserForMember,
        avatarFile: null,
        countryCode: '',
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
        setPhoneNumber: (number) =>
            set((state) => ({
                newMemberInfo: { ...state.newMemberInfo, phoneNumber: number },
            })),
        setCountryCode: (countryCode) => set({ countryCode }),
    })
)
