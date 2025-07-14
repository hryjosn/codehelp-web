import { Metadata } from 'next'
import { callGetChatroomInfoHandler } from '~/api/chatroom/chatroomAPI'
import { callGetUserInfoHandler } from '~/api/user/userAPI'

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id: chatroomId } = await params

    const userData = await callGetUserInfoHandler()
    const chatroomDataRes = await callGetChatroomInfoHandler(chatroomId)

    const isIAmMentor =
        userData.user.id === chatroomDataRes?.chatroom?.mentor.id

    const otherUserName = isIAmMentor
        ? chatroomDataRes!.chatroom.member.userName
        : chatroomDataRes!.chatroom.mentor.userName

    return {
        title: otherUserName,
    }
}

export { default } from '~/container/Chat/Chat'
