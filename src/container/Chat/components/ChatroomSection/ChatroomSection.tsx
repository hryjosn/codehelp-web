'use client'
import Chatroom from '../Chatroom/Chatroom'
import { useEffect, useMemo } from 'react'
import { useGetChatroomList } from '~/api/chatroom/chatroom'
import { useGetUserInfo } from '~/api/user/user'
import { Props } from './types'
import { useInView } from 'react-intersection-observer'

const ChatroomSection = ({ chatroomId }: Props) => {
    const {
        data: chatroomListData,
        hasNextPage,
        fetchNextPage,
    } = useGetChatroomList()

    const { data: userData } = useGetUserInfo()

    const { ref, inView } = useInView({
        threshold: 0.5,
    })

    const chatroomList = useMemo(() => {
        const queriedChatroom = chatroomListData?.pages.flatMap(
            (page) => page.chatroomList
        )
        return queriedChatroom
    }, [chatroomListData])

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    return (
        <>
            {chatroomList &&
                chatroomList.map((data, index) => (
                    <Chatroom
                        className={`${chatroomId === data.id && 'bg-gray-100'}`}
                        ref={index === chatroomList.length - 1 ? ref : null}
                        key={data.id}
                        id={data.id}
                        userName={
                            userData?.user?.id === data.mentor.id
                                ? data.member.userName
                                : data.mentor.userName
                        }
                        avatar={
                            userData?.user?.id === data.mentor.id
                                ? data.member.avatar
                                : data.mentor.avatar
                        }
                    />
                ))}
        </>
    )
}

export default ChatroomSection
