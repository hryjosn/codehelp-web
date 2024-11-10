import { create } from 'zustand'
import {
    callCreateChatroom,
    callCreateMessage,
    callGetChatroomInfo,
} from '~/api/chatroom'
import { ChatroomInfoT } from './type'

type Store = {
    content: string
    chatroomInfo: ChatroomInfoT
    createChatroom: (mentorId: string) => void
    createMessage: (content: string, chatroomId: string) => void
    getChatroomInfo: (chatroomId: string) => void
}

export const useChatroomStore = create<Store>()((set) => ({
    content: '',
    chatroomInfo: {
        id: '',
        createdAt: '',
        member: { id: '', userName: '', avatar: '' },
        mentor: { id: '', userName: '', avatar: '' },
        messages: [],
    },
    createChatroom: async (mentorId) => {
        await callCreateChatroom({ mentorId })
    },
    createMessage: async (content, chatroomId) => {
        await callCreateMessage({ content }, chatroomId)
    },
    getChatroomInfo: async (chatroomId) => {
        const res = await callGetChatroomInfo(chatroomId)
        set({ chatroomInfo: res.data.chatroom })
    },
}))
