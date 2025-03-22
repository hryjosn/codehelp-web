import { create } from 'zustand'
import { ClientToServerEvents, ServerToClientEvents } from '~/lib/types'
import { io, Socket } from 'socket.io-client'

type State = {
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
}

type Action = {
    connectSocket: () => void
}

export const useChatroomStore = create<State & Action>()((set) => ({
    socket: null,
    connectSocket: () => {
        set({ socket: io(process.env.NEXT_PUBLIC_API_URL) })
    },
}))
