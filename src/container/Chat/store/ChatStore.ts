import { create } from 'zustand'
import { ChatroomInfoT, MessageT } from './type'

type State = {
    content: string
    chatroomInfo: ChatroomInfoT
    chatroomId: string
}

type Action = {
    addMessage: (newMessage: MessageT) => void
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
}))
