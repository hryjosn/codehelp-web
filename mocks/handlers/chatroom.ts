import { http, HttpResponse } from 'msw'
import {
    createChatroomURL,
    createMessageURL,
    getChatroomInfoURL,
} from '~/api/chatroom/route'
import {
    ChatroomInfoReqT,
    ChatroomInfoResT,
    CreateChatroomReqT,
    CreateChatroomResT,
    NewMessageReqT,
    NewMessageResT,
} from '~/api/chatroom/types'

export const createChatroom = [
    http.post<CreateChatroomReqT, CreateChatroomResT>(createChatroomURL, () => {
        return HttpResponse.json({
            chatroomId: '8d7ec629-afa0-4728-a9a6-85e387f14c53',
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
                    id: '8d7ec629-afa0-4728-a9a6-85e387f14c53',
                    createdAt: '2025-03-09T03:39:36.023Z',
                    member: {
                        id: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                        userName: 'testMember1',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/eeba2d67-2244-4dbb-98f8-020a06053968',
                    },
                    mentor: {
                        id: '600fedbb-e44e-41f2-bd2e-0371de476b0c',
                        userName: 'testMentor16',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/eb658587-7fa9-4880-a1a2-dfcd3d993102',
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
                        id: '8d7ec629-afa0-4728-a9a6-85e387f14c53',
                        createdAt: '2025-03-09T03:39:36.023Z',
                        member: {
                            id: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                            userName: 'testMember1',
                            avatar: 'https://codehelp-backend-production.up.railway.app/image/eeba2d67-2244-4dbb-98f8-020a06053968',
                        },
                        mentor: {
                            id: '600fedbb-e44e-41f2-bd2e-0371de476b0c',
                            userName: 'testMentor16',
                            avatar: 'https://codehelp-backend-production.up.railway.app/image/eb658587-7fa9-4880-a1a2-dfcd3d993102',
                        },
                        messages: [],
                    },
                    userId: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                    content: 'new message for this chatroom',
                    id: 'b470260f-f646-4553-8c1e-b449f31b5741',
                    createdAt: '2025-03-09T03:39:36.023Z',
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
