import { create } from 'zustand'
import { ClientToServerEvents, ServerToClientEvents } from '~/lib/types'
import { io, Socket } from 'socket.io-client'

type State = {
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
}

type Action = {
    connectSocket: () => void
    disconnectSocket: () => void
}

export const useChatroomStore = create<State & Action>()((set, get) => ({
    socket: null,
    connectSocket: () => {
        set({ socket: io(process.env.NEXT_PUBLIC_API_URL) })
    },
    disconnectSocket: () => {
        get().socket?.disconnect()
        set({ socket: null })
    },
}))
