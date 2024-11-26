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
