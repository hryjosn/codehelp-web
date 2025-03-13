import { http, HttpResponse } from 'msw'
import {
    createChatroomURL,
    createMessageURL,
    getChatroomInfoURL,
    getChatroomListURL,
} from '~/api/chatroom/route'
import {
    ChatroomInfoReqT,
    ChatroomInfoResT,
    CreateChatroomReqT,
    CreateChatroomResT,
    NewMessageReqT,
    NewMessageResT,
    ChatroomListReqT,
    ChatroomListResT,
} from '~/api/chatroom/types'

const createChatroom = [
    http.post<CreateChatroomReqT, CreateChatroomResT>(
        '/api/chatroom/chatroom',
        () => {
            return HttpResponse.json({
                chatroomId: '8d7ec629-afa0-4728-a9a6-85e387f14c53',
                status: 'ok',
            })
        }
    ),
]

const getChatroomInfo = [
    http.get<ChatroomInfoReqT, ChatroomInfoResT>(
        '/api/chatroom/chatroom/123',
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

const createMessage = [
    http.post<NewMessageReqT, NewMessageResT>('/api/chatroom/message', () => {
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
    }),
]

const getChatroomList = [
    http.get<ChatroomListReqT, ChatroomListResT>(
        '/api/chatroom/list?page=1&count=10',
        () => {
            return HttpResponse.json({
                chatroomList: [
                    {
                        id: '8d7ec629-afa0-4728-a9a6-85e387f14c53',
                        created_at: '2025-03-09T03:39:36.023Z',
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
                    },
                    {
                        id: '0771ca65-0537-48b3-a010-793f7b0d8378',
                        created_at: '2025-03-13T07:25:09.026Z',
                        member: {
                            id: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                            userName: 'testMember1',
                            avatar: 'https://codehelp-backend-production.up.railway.app/image/eeba2d67-2244-4dbb-98f8-020a06053968',
                        },
                        mentor: {
                            id: '90548928-d41d-4908-ae78-59fa0d5d13a2',
                            userName: 'testMentor17',
                            avatar: 'https://codehelp-backend-production.up.railway.app/image/e7bcdf39-4ece-41d8-b572-b0526ae86c02',
                        },
                    },
                ],
                total: 2,
                status: 'ok',
            })
        }
    ),
]

export const chatroomHandlers = [
    ...createChatroom,
    ...createMessage,
    ...getChatroomInfo,
    ...getChatroomList,
]
