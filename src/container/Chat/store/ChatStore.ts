import { create } from 'zustand'
import {
    callCreateChatroom,
    callCreateMessage,
    callGetChatroomInfo,
    CreateChatroomResT,
    NewMessageResT,
} from '~/api/chatroom'
import { ChatroomInfoT } from './type'
import { RESPONSE_CODE } from '~/container/Login/store/types'

type Store = {
    content: string
    chatroomInfo: ChatroomInfoT
    createChatroom: (
        mentorId: string
    ) => Promise<CreateChatroomResT | RESPONSE_CODE.DATA_DUPLICATE>
    createMessage: (
        content: string,
        chatroomId: string
    ) => Promise<NewMessageResT>
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
        try {
            const res = await callCreateChatroom({ mentorId })
            return res.data
        } catch (error) {
            if (error === RESPONSE_CODE.DATA_DUPLICATE) {
                return error
            }
            throw error
        }
    },
    createMessage: async (content, chatroomId) => {
        const data = { content }
        try {
            const res = await callCreateMessage(data, chatroomId)
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
