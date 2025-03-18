import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import {
    MessageListQueryResT,
    CreateMessageData,
    ChatroomInfoResT,
    CreateChatroomData,
} from './types'
import axios from 'axios'

export const useCreateChatroom = () => {
    return useMutation({
        mutationFn: async (data: CreateChatroomData) => {
            return await axios.post('/api/chatroom/chatroom', {
                data,
            })
        },
    })
}

export const useGetChatroomInfo = (chatroomId: string) => {
    return useQuery({
        queryKey: ['chatroomInfo', chatroomId],
        queryFn: async (): Promise<ChatroomInfoResT> => {
            const res = await axios.get(`/api/chatroom/chatroom/${chatroomId}`)
            return res.data
        },
    })
}

export const useGetMessageList = (chatroomId: string) => {
    return useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['messageList', chatroomId],
        queryFn: async ({
            pageParam,
            queryKey,
        }): Promise<MessageListQueryResT> => {
            const [, chatroomId] = queryKey as [string, string]
            const pageSize = 10
            const {
                data: { total, messagesList },
            } = await axios.get(
                `/api/chatroom/chatroom/${chatroomId}/message?page=${pageParam}&count=${pageSize}`
            )

            return {
                messagesList,
                total,
                pageParam,
                pageSize,
            }
        },
        getNextPageParam: (res) => {
            if (res.pageParam * res.pageSize < res.total) {
                return res.pageParam + 1
            }
            return undefined
        },
    })
}

export const useCreateMessage = () => {
    return useMutation({
        mutationFn: async (data: CreateMessageData) => {
            return await axios.post('/api/chatroom/message', {
                data,
            })
        },
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
            } = await axios.get(
                `/api/chatroom/list?page=${pageParam}&count=${pageSize}`
            )

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
