'use client'
import Image from 'next/image'
import MessageBox from '../MessageBox/MessageBox'
import { useChatroomStore } from '../../store/ChatStore'
import { useEffect, useMemo, useState } from 'react'
import { Props } from './types'
import ButtonInput from '~/components/ButtonInput/ButtonInput'
import {
    useCreateMessage,
    useGetMessageRecord,
    useGetChatroomInfo,
} from '~/api/chatroom/chatroom'
import { useQueryClient } from '@tanstack/react-query'

const ChattingArea = ({ chatroomId }: Props) => {
    const queryClient = useQueryClient()
    const { mutate: createMessage } = useCreateMessage()
    const { data: messageListData } = useGetMessageRecord(chatroomId)
    const { data: chatroomInfo } = useGetChatroomInfo(chatroomId)

    const [content, setContent] = useState('')
    const addMessage = useChatroomStore((state) => state.addMessage)
    const socket = useChatroomStore((state) => state.socket)

    const messagesList = useMemo(() => {
        const queriedChatroomInfo = messageListData?.pages.flatMap(
            (page) => page.messages
        )
        return queriedChatroomInfo
    }, [messageListData])

    useEffect(() => {
        if (socket) {
            socket.emit('join', chatroomId)

            // socket.on('receiveMessage', (msgData) => {
            //     queryClient.setQueryData(
            //         ['messageList', chatroomId],
            //         ({ pages, pageParams }) => {
            //             return {
            //                 pageParams,
            //                 pages: pages?.map(({ total, messagesList }) => {
            //                     return {
            //                         total,
            //                         messagesList: [msgData, ...messagesList],
            //                     }
            //                 }),
            //             }
            //         }
            //     )
            // })
        }
    }, [])

    return (
        <div className="flex h-screen min-w-[300px] flex-1 flex-col px-5 py-5">
            <div className="custom-scrollbar mt-5 flex flex-1 flex-col-reverse overflow-x-hidden overflow-y-scroll">
                {!!messagesList?.length &&
                    !!chatroomInfo &&
                    messagesList.map((data) => (
                        <div key={data.id}>
                            {chatroomInfo.chatroom.member.id === data.userId ? (
                                <div className="my-3 ml-20 flex justify-end">
                                    <MessageBox
                                        key={data.id}
                                        message={data.content}
                                    />
                                </div>
                            ) : (
                                <div className="my-3 flex items-center">
                                    <Image
                                        className="min-h-12 min-w-12 rounded-full"
                                        src={
                                            chatroomInfo.chatroom.mentor
                                                .avatar || ''
                                        }
                                        alt=""
                                        width="48"
                                        height="48"
                                    />
                                    <div className="ml-5 mr-3">
                                        <MessageBox
                                            key={data.id}
                                            message={data.content}
                                        />
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
                                    if (res?.data?.message) {
                                        addMessage(res.data.message)
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
