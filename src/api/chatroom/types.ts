
import { ChatroomInfoT } from '~/container/Chat/store/type'
import { ChatroomListT } from '~/container/Chat/store/type'
export interface CreateChatroomReqT {}
export interface CreateChatroomResT {
    chatroomId: string
    status: string
}

export interface ChatroomInfoReqT {}
export interface ChatroomInfoResT {
    chatroom: ChatroomInfoT
    status: string
}

export interface NewMessageReqT {}
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
export interface ChatroomListResT {
    chatroomList: ChatroomListT[]
    status: string
    total: number
}
