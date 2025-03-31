import { baseURL } from '../api'

export const createMessageURL = (chatroomId: string) =>
    `${baseURL}/chatroom/${chatroomId}/newMessage`

export const getChatroomInfoURL = (chatroomId: string) =>
    `${baseURL}/chatroom/info/${chatroomId}`

export const createChatroomURL = `${baseURL}/chatroom/create`

export const getChatroomListURL = `/chatroom/list`
