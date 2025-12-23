import fetchApi from '~/utils/fetch'
import { GetChatroomInfoHandler } from './types'

export const callGetChatroomInfoHandler = async (chatroomId: string) => {
    try {
        const res = await fetchApi<never, GetChatroomInfoHandler>({
            url: `/api/chatroom/chatroom/${chatroomId}`,
            method: 'GET',
        })

        return res
    } catch (error) {
        console.error('Error fetching user info:', error)
        throw error
    }
}
