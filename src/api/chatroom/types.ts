import {
    ChatroomInfoT,
    ChatroomListT,
    MessageT,
} from '~/container/Chat/store/type'

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

export interface ChatroomListReqT {}
export interface ChatroomListResT {
    chatroomList: ChatroomListT[]
    status: string
    total: number
}

export interface CreateMessageData {
    content: string
    chatroomId: string
}

export interface MessageListQueryResT {
    messagesList: MessageT[]
    total: number
    pageSize: number
    pageParam: number
}

export interface CreateChatroomData {
    mentorId: string
}
