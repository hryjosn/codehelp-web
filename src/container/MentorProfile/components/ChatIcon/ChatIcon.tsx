'use client'

import { HiChatBubbleLeftEllipsis } from 'react-icons/hi2'
import { useRouter } from '~/i18n/routing'
import { useCreateChatroom } from '~/api/chatroom/chatroom'
import { useChatroomStore } from '~/container/Chat/store/ChatStore'

const ChatIcon = ({ mentorId }: { mentorId: string }) => {
    const router = useRouter()
    const { mutate: createChatroom } = useCreateChatroom()
    const connectSocket = useChatroomStore((state) => state.connectSocket)
    return (
        <HiChatBubbleLeftEllipsis
            className="cursor-pointer"
            size={30}
            onClick={async () => {
                createChatroom(
                    { mentorId },
                    {
                        onSuccess(res) {
                            if (res?.data?.chatroomId) {
                                connectSocket()
                                router.push(`/chat/${res.data.chatroomId}`)
                            }
                        },
                    }
                )
            }}
        />
    )
}
export default ChatIcon
