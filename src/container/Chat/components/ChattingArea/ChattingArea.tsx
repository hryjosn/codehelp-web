'use client'
import MessageBox from '../MessageBox/MessageBox'
import { useChatroomStore } from '../../store/ChatStore'
import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Props, QueryPagesParams, QueryParams } from './types'
import ButtonInput from '~/components/ButtonInput/ButtonInput'
import {
    useCreateMessage,
    useGetMessageRecord,
    useGetChatroomInfo,
} from '~/api/chatroom/chatroom'
import { useQueryClient } from '@tanstack/react-query'
import Avatar from '~/components/Avatar/Avatar'
import { useTranslations } from 'next-intl'
import ChattingAreaHeader from './components/ChattingAreaHeader'

const ChattingArea = ({ chatroomId, userData }: Props) => {
    const date = new Date()
    const queryClient = useQueryClient()
    const { mutate: createMessage } = useCreateMessage()
    const {
        data: messageListData,
        hasNextPage,
        fetchNextPage,
    } = useGetMessageRecord(chatroomId)

    const { data: chatroomData } = useGetChatroomInfo(chatroomId)

    const t = useTranslations('Chat')

    const [content, setContent] = useState('')
    const socket = useChatroomStore((state) => state.socket)
    const connectSocket = useChatroomStore((state) => state.connectSocket)
    const disconnectSocket = useChatroomStore((state) => state.disconnectSocket)
    const { ref, inView } = useInView({
        threshold: 0.5,
    })

    const messagesList = useMemo(() => {
        return messageListData?.pages.flatMap((page) => page.messages)
    }, [messageListData])

    const isIAmMentor =
        userData.userName === chatroomData?.chatroom?.mentor?.userName
    const myData = isIAmMentor
        ? chatroomData?.chatroom?.mentor
        : chatroomData?.chatroom?.member

    useEffect(() => {
        if (socket) {
            socket.emit('join', chatroomId)

            socket.on('receiveMessage', (msgData) => {
                const { roomId } = msgData

                queryClient.setQueryData(
                    ['messageRecord', roomId],
                    ({ pages, pageParams }: QueryParams) => {
                        return {
                            pageParams,
                            pages: pages?.map(
                                ({ total, messages }: QueryPagesParams) => {
                                    return {
                                        total,
                                        messages: [msgData, ...messages],
                                    }
                                }
                            ),
                        }
                    }
                )
            })
        } else {
            connectSocket()
        }
        return () => {
            if (socket) {
                disconnectSocket()
            }
        }
    }, [chatroomId, connectSocket, disconnectSocket, queryClient, socket])

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    return (
        <div className="flex h-screen min-w-[300px] flex-1 flex-col py-5">
            {myData && (
                <ChattingAreaHeader
                    avatar={myData.avatar}
                    userName={myData.userName}
                />
            )}
            <div className="custom-scrollbar mt-5 flex flex-1 flex-col-reverse overflow-x-hidden overflow-y-scroll px-5">
                {!!messagesList?.length &&
                    !!userData &&
                    messagesList.map((data, index) => (
                        <div
                            key={data?.id}
                            ref={index === messagesList.length - 1 ? ref : null}
                        >
                            {userData.id === data?.user?.id ? (
                                <div className="my-3 ml-20 flex justify-end">
                                    <MessageBox message={data?.content} />
                                </div>
                            ) : (
                                <div className="my-3 flex items-center">
                                    <Avatar src={data?.user?.avatar} />
                                    <div className="ml-5 mr-3">
                                        <MessageBox message={data?.content} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
            <div className="flex justify-center px-5">
                <ButtonInput
                    value={content}
                    maxRows={17}
                    placeholder={t('message_input_placeholder')}
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                    onClick={() => {
                        createMessage(
                            { content, chatroomId },
                            {
                                onSuccess(res) {
                                    if (
                                        res?.data?.message &&
                                        socket &&
                                        userData
                                    ) {
                                        socket.emit('sendMessage', {
                                            id: date.getTime().toString(),
                                            user: {
                                                id: userData.id,
                                                userName: userData.userName,
                                                avatar: userData.avatar,
                                            },
                                            roomId: chatroomId,
                                            content,
                                            createdAt: date.toISOString(),
                                            type: 0,
                                        })
                                    }
                                },
                            }
                        )
                        setContent('')
                    }}
                />
            </div>
        </div>
    )
}

export default ChattingArea
