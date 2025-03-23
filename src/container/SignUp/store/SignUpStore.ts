import { create } from 'zustand'

type State = {
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
    getFormData: (registerName: string) => State[keyof State]
}

export type SignUpStore = State & Actions

export const useSignUpStore = create<State & Actions>()((set, get) => ({
    userName: '',
    email: '',
    password: '',
    avatar: null,
    getFormData: (registerName) => get()[registerName as keyof State],
    setUserName: (userName) => set({ userName }),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setAvatar: (avatar) => set({ avatar }),
}))
