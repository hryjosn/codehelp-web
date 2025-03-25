import { create } from 'zustand'

type States = {
    userName: string
    email: string
    password: string
    avatar: File | null
}

type Actions = {
    setUserName: (userName: string) => void
    setEmail: (email: string) => void
    setPassword: (password: string) => void
    setAvatar: (avatar: File | null) => void
    getFormData: (registerName: string) => States[keyof States]
}

export type SignUpStore = States & Actions

export const useSignUpStore = create<States & Actions>()((set, get) => ({
    userName: '',
    email: '',
    password: '',
    avatar: null,
    getFormData: (registerName) => get()[registerName as keyof States],
    setUserName: (userName) => set({ userName }),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setAvatar: (avatar) => set({ avatar }),
}))
