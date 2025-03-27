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
        '/api/chatroom/chatroom/:chatroomId',
        () => {
            return HttpResponse.json({
                chatroom: {
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
                    messages: [
                        {
                            id: '33818a27-da4a-448d-a12d-5f36bfb57938',
                            userId: '600fedbb-e44e-41f2-bd2e-0371de476b0c',
                            content: '123',
                            created_at: '2025-03-10T08:27:37.570Z',
                        },
                        {
                            id: '33818a27-da4a-448d-a12d-5f36bfb57936',
                            userId: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                            content: '123',
                            created_at: '2025-03-10T08:27:37.570Z',
                        },
                        {
                            id: '7ad4532b-4a98-40f9-843d-a94b1feb5f98',
                            userId: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                            content: 'new message for this chatroom',
                            created_at: '2025-03-10T08:30:48.875Z',
                        },
                        {
                            id: 'b4086239-2495-4cd0-8a89-e0dd7713b8bf',
                            userId: '600fedbb-e44e-41f2-bd2e-0371de476b0c',
                            content: 'test',
                            created_at: '2025-03-11T03:10:04.455Z',
                        },
                        {
                            id: 'f0031845-a688-4d24-b337-dbb2a5982b19',
                            userId: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                            content: 'hello',
                            created_at: '2025-03-11T06:54:34.607Z',
                        },
                        {
                            id: '50fa7e5a-f27e-446f-acfe-6f2eca7263cb',
                            userId: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                            content: 'new message for this chatroom',
                            created_at: '2025-03-11T06:55:08.795Z',
                        },
                        {
                            id: '2fca5b2f-01aa-4252-b3b1-3d9e4315d0f6',
                            userId: '600fedbb-e44e-41f2-bd2e-0371de476b0c',
                            content: 'test2',
                            created_at: '2025-03-11T06:58:57.956Z',
                        },
                        {
                            id: '6f4df757-ef8d-4227-a239-867be6a2885b',
                            userId: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                            content: 'ut\n',
                            created_at: '2025-03-11T07:11:51.570Z',
                        },
                        {
                            id: '75f6bf3e-9254-45f3-8506-73bd610e0de7',
                            userId: '600fedbb-e44e-41f2-bd2e-0371de476b0c',
                            content: 'new message for this chatroom',
                            created_at: '2025-03-13T08:15:54.933Z',
                        },
                        {
                            id: '0dc624f1-2c1b-4944-94bf-20e06e09ff4f',
                            userId: '600fedbb-e44e-41f2-bd2e-0371de476b0c',
                            content:
                                'new message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroom',
                            created_at: '2025-03-13T08:16:34.177Z',
                        },
                    ],
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
    http.get<ChatroomListReqT, ChatroomListResT>('/api/chatroom/list', () => {
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
    }),
]

const getMessageList = [
    http.get('/api/chatroom/chatroom/:chatroomId/message', () => {
        return HttpResponse.json({
            messages: [
                {
                    id: '33818a27-da4a-448d-a12d-5f36bfb57938',
                    user: {
                        id: '600fedbb-e44e-41f2-bd2e-0371de476b0c',
                        userName: 'testMentor16',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/eb658587-7fa9-4880-a1a2-dfcd3d993102',
                    },
                    content: '123',
                    createdAt: '2025-03-10T08:27:37.570Z',
                    type: 0,
                },
                {
                    id: '33818a27-da4a-448d-a12d-5f36bfb57936',
                    user: {
                        id: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                        userName: 'testMember1',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/eeba2d67-2244-4dbb-98f8-020a06053968',
                    },
                    content: '123',
                    createdAt: '2025-03-10T08:27:37.570Z',
                    type: 0,
                },
                {
                    id: '7ad4532b-4a98-40f9-843d-a94b1feb5f98',
                    user: {
                        id: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                        userName: 'testMember1',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/eeba2d67-2244-4dbb-98f8-020a06053968',
                    },
                    content: 'new message for this chatroom',
                    createdAt: '2025-03-10T08:30:48.875Z',
                    type: 0,
                },
                {
                    id: 'b4086239-2495-4cd0-8a89-e0dd7713b8bf',
                    user: {
                        id: '600fedbb-e44e-41f2-bd2e-0371de476b0c',
                        userName: 'testMentor16',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/eb658587-7fa9-4880-a1a2-dfcd3d993102',
                    },
                    content: 'test',
                    createdAt: '2025-03-11T03:10:04.455Z',
                    type: 0,
                },
                {
                    id: 'f0031845-a688-4d24-b337-dbb2a5982b19',
                    user: {
                        id: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                        userName: 'testMember1',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/eeba2d67-2244-4dbb-98f8-020a06053968',
                    },
                    content: 'hello',
                    createdAt: '2025-03-11T06:54:34.607Z',
                    type: 0,
                },
                {
                    id: '50fa7e5a-f27e-446f-acfe-6f2eca7263cb',
                    user: {
                        id: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                        userName: 'testMember1',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/eeba2d67-2244-4dbb-98f8-020a06053968',
                    },
                    content: 'new message for this chatroom',
                    createdAt: '2025-03-11T06:55:08.795Z',
                    type: 0,
                },
                {
                    id: '2fca5b2f-01aa-4252-b3b1-3d9e4315d0f6',
                    user: {
                        id: '600fedbb-e44e-41f2-bd2e-0371de476b0c',
                        userName: 'testMentor16',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/eb658587-7fa9-4880-a1a2-dfcd3d993102',
                    },
                    content: 'test2',
                    createdAt: '2025-03-11T06:58:57.956Z',
                    type: 0,
                },
                {
                    id: '6f4df757-ef8d-4227-a239-867be6a2885b',
                    user: {
                        id: '94dd9ba9-6a72-4285-9e18-cff7b4e3479f',
                        userName: 'testMember1',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/eeba2d67-2244-4dbb-98f8-020a06053968',
                    },
                    content: 'ut\n',
                    createdAt: '2025-03-11T07:11:51.570Z',
                    type: 0,
                },
                {
                    id: '75f6bf3e-9254-45f3-8506-73bd610e0de7',
                    user: {
                        id: '600fedbb-e44e-41f2-bd2e-0371de476b0c',
                        userName: 'testMentor16',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/eb658587-7fa9-4880-a1a2-dfcd3d993102',
                    },
                    content: 'new message for this chatroom',
                    createdAt: '2025-03-13T08:15:54.933Z',
                    type: 0,
                },
                {
                    id: '0dc624f1-2c1b-4944-94bf-20e06e09ff4f',
                    user: {
                        id: '600fedbb-e44e-41f2-bd2e-0371de476b0c',
                        userName: 'testMentor16',
                        avatar: 'https://codehelp-backend-production.up.railway.app/image/eb658587-7fa9-4880-a1a2-dfcd3d993102',
                    },
                    content:
                        'new message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroomnew message for this chatroom',
                    createdAt: '2025-03-13T08:16:34.177Z',
                    type: 0,
                },
            ],
            total: 10,
            status: 'ok',
        })
    }),
]

export const chatroomHandlers = [
    ...createChatroom,
    ...createMessage,
    ...getChatroomInfo,
    ...getChatroomList,
    ...getMessageList,
]
