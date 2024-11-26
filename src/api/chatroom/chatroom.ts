import apiHandler from '../api'
import { NewMessageResT, ChatroomInfoResT, CreateChatroomResT } from './types'

export const createChatroomURL = ''
export const callCreateChatroom = (data: any) => {
    return apiHandler<CreateChatroomResT>({
        url: '/chatroom/create',
        method: 'post',
        data,
    })
}

export const getChatroomInfoURL = ''
export const callGetChatroomInfo = (chatroomId: string) => {
    return apiHandler<ChatroomInfoResT>({
        url: `/chatroom/info/${chatroomId}`,
        method: 'get',
    })
}

export const createMessageURL = ''
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
