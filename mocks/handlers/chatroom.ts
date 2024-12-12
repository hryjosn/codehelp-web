import { http, HttpResponse } from 'msw'
import {
    CreateChatroomResT,
    CreateChatroomReqT,
    ChatroomInfoReqT,
    ChatroomInfoResT,
    NewMessageReqT,
    NewMessageResT,
} from '~/api/chatroom/types'
import {
    createChatroomURL,
    getChatroomInfoURL,
    createMessageURL,
} from '~/api/chatroom/api_url'

export const createChatroom = [
    http.post<CreateChatroomReqT, CreateChatroomResT>(createChatroomURL, () => {
        return HttpResponse.json({
            chatroomId: '79b720c1-b496-4d61-b9a1-2279eae7bb36',
            status: 'ok',
        })
    }),
]

export const getChatroomInfo = [
    http.get<ChatroomInfoReqT, ChatroomInfoResT>(
        getChatroomInfoURL('fakeId'),
        () => {
            return HttpResponse.json({
                chatroom: {
                    id: '79b720c1-b496-4d61-b9a1-2279eae7bb36',
                    createdAt: '2024-11-26T09:20:47.207Z',
                    member: {
                        id: '7f17f643-c79a-42a9-841c-ddc775f7a807',
                        userName: 'test1',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/89b927ba-9a39-4ec6-9679-10fee13d6e06',
                    },
                    mentor: {
                        id: '0415338d-95be-4977-8b2a-74029e64ca25',
                        userName: 'test007',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/f6a9ab3c-165d-4dae-b102-8501aadcb8c9',
                    },
                    messages: [],
                },
                status: 'ok',
            })
        }
    ),
]

export const createMessage = [
    http.post<NewMessageReqT, NewMessageResT>(
        createMessageURL('fakeId'),
        () => {
            return HttpResponse.json({
                message: {
                    chatroom: {
                        id: '79b720c1-b496-4d61-b9a1-2279eae7bb36',
                        createdAt: '2024-11-26T09:20:47.207Z',
                        member: {
                            id: '7f17f643-c79a-42a9-841c-ddc775f7a807',
                            userName: 'test1',
                            avatar: 'https://codehelp-backend-production.up.railway.app/image/89b927ba-9a39-4ec6-9679-10fee13d6e06',
                        },
                        mentor: {
                            id: '0415338d-95be-4977-8b2a-74029e64ca25',
                            userName: 'test007',
                            avatar: 'https://codehelp-backend-production.up.railway.app/image/f6a9ab3c-165d-4dae-b102-8501aadcb8c9',
                        },
                        messages: [],
                    },
                    userId: '7f17f643-c79a-42a9-841c-ddc775f7a807',
                    content: 'new message for this chatroom',
                    id: 'b470260f-f646-4553-8c1e-b449f31b5741',
                    createdAt: '2024-11-26T09:43:41.650Z',
                },
                status: 'ok',
            })
        }
    ),
]

export const chatroomHandlers = [
    ...createChatroom,
    ...createMessage,
    ...getChatroomInfo,
]
