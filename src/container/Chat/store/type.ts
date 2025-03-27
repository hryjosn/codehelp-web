interface RoleInfoT {
    id: string
    userName: string
    avatar: string
}

export interface MessageT {
    id: string
    user: {
        id: string
        userName: string
        avatar: string
    }
    content: string
    created_at: string
}

export interface CreateChatroomT {
    chatroomId: string
    status: string
}

export interface ChatroomInfoT {
    id: string
    created_at: string
    member: RoleInfoT
    mentor: RoleInfoT
    messages: MessageT[]
}
export interface ChatroomListT {
    id: string
    created_at: string
    member: RoleInfoT
    mentor: RoleInfoT
}
