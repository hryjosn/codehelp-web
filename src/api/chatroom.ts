import { useInfiniteQuery } from '@tanstack/react-query'
import apiHandler from './api'
import { ChatroomInfoT, ChatroomListT } from '~/container/Chat/store/type'

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
interface ChatroomListResT {
    chatroomList: ChatroomListT[]
    status: string
    total: number
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
export const useGetChatroomList = () => {
    return useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['chatroomList'],
        queryFn: async ({ pageParam }) => {
            const pageSize = 10
            const {
                data: { total, chatroomList },
            } = await apiHandler<ChatroomListResT>({
                url: `/chatroom/list?page=${pageParam}&count=${pageSize}`,
                method: 'get',
            })

            return { chatroomList, total, pageParam, pageSize }
        },
        getNextPageParam: (res) => {
            if (res.pageParam * res.pageSize < res.total) {
                return res.pageParam + 1
            }
            return undefined
        },
    })
}
