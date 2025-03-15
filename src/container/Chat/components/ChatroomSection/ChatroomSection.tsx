'use client'
import Chatroom from '../Chatroom/Chatroom'
import { useMemo } from 'react'
import { useGetChatroomList } from '~/api/chatroom/chatroom'

const ChatroomSection = () => {
    const { data: chatroomListData } = useGetChatroomList()
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
                        userName={data.mentor.userName}
                        avatar={data.mentor.avatar}
                    />
                ))}
        </>
    )
}

export default ChatroomSection
