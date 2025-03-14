import { create } from 'zustand'
import {
    callCreateChatroom,
    callGetChatroomInfo,
} from '~/api/chatroom/chatroom'
import { CreateChatroomResT } from '~/api/chatroom/types'
import { ChatroomInfoT, MessageT } from './type'

type State = {
    content: string
    chatroomInfo: ChatroomInfoT
    chatroomId: string
}

type Action = {
    createChatroom: (mentorId: string) => Promise<CreateChatroomResT>
    getChatroomInfo: (chatroomId: string) => void
    setChatroomId: (chatroomId: string) => void
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
    setChatroomId: (chatroomId: string) => set({ chatroomId }),
    createChatroom: async (mentorId) => {
        try {
            const res = await callCreateChatroom({ mentorId })
            return res.data
        } catch (error) {
            throw error
        }
    },
    getChatroomInfo: async (chatroomId) => {
        const res = await callGetChatroomInfo(chatroomId)
        set({ chatroomInfo: res.data.chatroom })
    },
}))
