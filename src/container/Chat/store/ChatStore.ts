import { create } from 'zustand'
import { ChatroomInfoT, MessageT } from './type'
import { ClientToServerEvents, ServerToClientEvents } from '~/lib/types'
import { io, Socket } from 'socket.io-client'

type State = {
    content: string
    chatroomInfo: ChatroomInfoT
    chatroomId: string
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
}

type Action = {
    addMessage: (newMessage: MessageT) => void
    connectSocket: () => void
}

export const useChatroomStore = create<State & Action>()((set, get) => ({
    content: '',
    chatroomId: '',
    chatroomInfo: {
        id: '',
        createdAt: '',
        member: { id: '', userName: '', avatar: '' },
        mentor: { id: '', userName: '', avatar: '' },
        messages: [],
    },
    socket: null,
    addMessage: (newMessage) =>
        set((state) => ({
            chatroomInfo: {
                ...state.chatroomInfo,
                messages: [
                    ...state.chatroomInfo.messages,
                    {
                        id: newMessage.id,
                        userId: newMessage.userId,
                        content: newMessage.content,
                        createdAt: newMessage.createdAt,
                    },
                ],
            },
        })),
    connectSocket: () => set({ socket: io(process.env.NEXT_PUBLIC_API_URL) }),
}))
