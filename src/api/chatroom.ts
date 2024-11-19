import apiHandler from './api'
import { ChatroomInfoT } from '~/container/Chat/store/type'

export interface CreateChatroomResT {
    chatroomId: string
    total: number
}

export interface ChatroomInfoResT {
    chatroom: ChatroomInfoT
    status: string
}
export interface NewMessageResT {
    message: {
        id: string
        createdAt: string
        userId: string
        content: string
        chatroom: ChatroomInfoT
    }
    status: string
}

export const callCreateChatroom = (data: any) => {
    return apiHandler<CreateChatroomResT>({
        url: '/chatroom/create',
        method: 'post',
        data,
    })
}
export const callGetChatroomInfo = (chatroomId: string) => {
    return apiHandler<ChatroomInfoResT>({
        url: `/chatroom/info/${chatroomId}`,
        method: 'get',
    })
}

export const callCreateMessage = (
    data: { content: string },
    chatroomId: string
) => {
    return apiHandler<NewMessageResT>({
        url: `/chatroom/${chatroomId}/newMessage`,
        method: 'post',
        data,
    })
}
