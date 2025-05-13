import axios from 'axios'
import { create } from 'zustand'

type State = {
    token: string
}
type Actions = {
    fetchToken: () => void
    setToken: (token: string) => void
}
export type HeaderStore = State & Actions

export const useHeaderStore = create<State & Actions>()((set, get) => ({
    token: '',
    fetchToken: async () => {
        try {
            const { data } = await axios.get('/api/auth/token')

            if (data.token) {
                get().setToken(data.token)
            }
        } catch (error) {
            console.error('Failed to fetch token:', error)
            get().setToken('')
        }
    },
    setToken: (token) => set({ token }),
}))
