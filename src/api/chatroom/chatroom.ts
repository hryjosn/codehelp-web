import apiHandler from '../api'
import { NewMessageResT, ChatroomInfoResT, CreateChatroomResT } from './types'
import {
    createMessageURL,
    createChatroomURL,
    getChatroomInfoURL,
} from './api_url'

export const callCreateChatroom = (data: any) => {
    return apiHandler<CreateChatroomResT>({
        url: createChatroomURL,
        method: 'post',
        data,
    })
}

export const callGetChatroomInfo = (chatroomId: string) => {
    return apiHandler<ChatroomInfoResT>({
        url: getChatroomInfoURL(chatroomId),
        method: 'get',
    })
}

export const callCreateMessage = (
    data: { content: string },
    chatroomId: string
) => {
    return apiHandler<NewMessageResT>({
        url: createMessageURL(chatroomId),
        method: 'post',
        data,
    })
}
