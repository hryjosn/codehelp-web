import apiHandler from '../api'
import {
    NewMessageResT,
    ChatroomInfoResT,
    CreateChatroomResT,
    ChatroomListResT,
} from './types'
import {
    createMessageURL,
    createChatroomURL,
    getChatroomInfoURL,
    getChatroomListURL,
} from './api_url'
import { useInfiniteQuery } from '@tanstack/react-query'

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

export const useGetChatroomList = () => {
    return useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['chatroomList'],
        queryFn: async ({ pageParam }) => {
            const pageSize = 10
            const {
                data: { total, chatroomList },
            } = await apiHandler<ChatroomListResT>({
                url: getChatroomListURL(pageParam, pageSize),
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
