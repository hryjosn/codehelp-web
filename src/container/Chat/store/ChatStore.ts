import { create } from 'zustand'
import {
    callCreateChatroom,
    callCreateMessage,
    callGetChatroomInfo,
} from '~/api/chatroom/chatroom'
import { CreateChatroomResT, NewMessageResT } from '~/api/chatroom/types'
import { ChatroomInfoT, MessageT } from './type'

type State = {
    content: string
    chatroomInfo: ChatroomInfoT
    chatroomId: string
}

type Action = {
    createChatroom: (mentorId: string) => Promise<CreateChatroomResT>
    createMessage: ({
        content,
        chatroomId,
    }: {
        content: string
        chatroomId: string
    }) => Promise<NewMessageResT>
    getChatroomInfo: (chatroomId: string) => void
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
    createChatroom: async (mentorId) => {
        try {
            const res = await callCreateChatroom({ mentorId })
            return res.data
        } catch (error) {
            throw error
        }
    },
    createMessage: async ({ content, chatroomId }) => {
        try {
            const res = await callCreateMessage({ content, chatroomId })
            if (res?.data?.message?.chatroom?.messages) {
                get().addMessage(res.data.message)
            }
            return res.data
        } catch (error) {
            throw error
        }
    },
    getChatroomInfo: async (chatroomId) => {
        set({ chatroomId: chatroomId })
        const res = await callGetChatroomInfo(chatroomId)
        set({ chatroomInfo: res.data.chatroom })
    },
}))
