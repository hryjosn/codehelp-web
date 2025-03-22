'use client'
import MessageBox from '../MessageBox/MessageBox'
import { useChatroomStore } from '../../store/ChatStore'
import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Props, QueryPagesParams, QueryParams } from './types'
import ButtonInput from '~/components/ButtonInput/ButtonInput'
import { useCreateMessage, useGetMessageRecord } from '~/api/chatroom/chatroom'
import { useQueryClient } from '@tanstack/react-query'
import { useGetUserInfo } from '~/api/user/user'
import Avatar from '~/components/Avatar/Avatar'

const ChattingArea = ({ chatroomId }: Props) => {
    const date = new Date()
    const queryClient = useQueryClient()
    const { mutate: createMessage } = useCreateMessage()
    const {
        data: messageListData,
        hasNextPage,
        fetchNextPage,
    } = useGetMessageRecord(chatroomId)
    const { data: userData } = useGetUserInfo()

    const [content, setContent] = useState('')
    const socket = useChatroomStore((state) => state.socket)
    const connectSocket = useChatroomStore((state) => state.connectSocket)
    const { ref, inView } = useInView({
        threshold: 0.5,
    })

    const messagesList = useMemo(() => {
        return messageListData?.pages.flatMap((page) => page.messages)
    }, [messageListData])

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
    }, [chatroomId, connectSocket, queryClient, socket])

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    return (
        <div className="flex h-screen min-w-[300px] flex-1 flex-col px-5 py-5">
            <div className="custom-scrollbar mt-5 flex flex-1 flex-col-reverse overflow-x-hidden overflow-y-scroll">
                {!!messagesList?.length &&
                    !!userData &&
                    messagesList.map((data, index) => (
                        <div
                            key={data.id}
                            ref={index === messagesList.length - 1 ? ref : null}
                        >
                            {userData.user.id === data.sender.id ? (
                                <div className="my-3 ml-20 flex justify-end">
                                    <MessageBox message={data.content} />
                                </div>
                            ) : (
                                <div className="my-3 flex items-center">
                                    <Avatar src={data.sender.avatar} />
                                    <div className="ml-5 mr-3">
                                        <MessageBox message={data.content} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
            <div className="flex justify-center pr-3">
                <ButtonInput
                    value={content}
                    maxRows={17}
                    placeholder="Write something..."
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
                                            sender: {
                                                id: userData.user.id,
                                                userName:
                                                    userData.user.userName,
                                                avatar: userData.user.avatar,
                                            },
                                            roomId: chatroomId,
                                            content,
                                            created_at: date
                                                .getTime()
                                                .toString(),
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
