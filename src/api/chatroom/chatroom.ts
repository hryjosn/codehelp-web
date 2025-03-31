import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { CreateMessageData } from './types'
import axios from 'axios'

export const callCreateChatroom = async (data: any) => {
    return await axios.post('/api/chatroom/chatroom', {
        data,
    })
}

export const callGetChatroomInfo = async (chatroomId: string) => {
    return await axios.get(`/api/chatroom/chatroom/${chatroomId}`)
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
