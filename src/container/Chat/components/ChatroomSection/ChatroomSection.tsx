'use client'
import Chatroom from '../Chatroom/Chatroom'
import { useMemo } from 'react'
import { useGetChatroomList } from '~/api/chatroom/chatroom'
import { useGetUserInfo } from '~/api/user/user'

const ChatroomSection = () => {
    const { data: chatroomListData } = useGetChatroomList()
    const { data: userData } = useGetUserInfo()
    const chatroomList = useMemo(() => {
        const queriedChatroom = chatroomListData?.pages.flatMap(
            (page) => page.chatroomList
        )
        return queriedChatroom
    }, [chatroomListData])

    return (
        <>
            {chatroomList &&
                chatroomList.map((data) => (
                    <Chatroom
                        key={data.id}
                        id={data.id}
                        userName={
                            userData?.user?.id === data.mentor.id
                                ? data.mentor.userName
                                : data.member.userName
                        }
                        avatar={
                            userData?.user?.id === data.mentor.id
                                ? data.mentor.avatar
                                : data.member.avatar
                        }
                    />
                ))}
        </>
    )
}

export default ChatroomSection
