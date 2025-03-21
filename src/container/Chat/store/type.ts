interface RoleInfoT {
    id: string
    userName: string
    avatar: string
}

export interface MessageT {
    id: string
    userId: string
    content: string
    createdAt: string
}

export interface CreateChatroomT {
    chatroomId: string
    status: string
}

export interface ChatroomInfoT {
    id: string
    createdAt: string
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
