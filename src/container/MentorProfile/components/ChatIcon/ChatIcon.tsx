'use client'

import { HiChatBubbleLeftEllipsis } from 'react-icons/hi2'
import { useRouter } from '~/i18n/routing'
import { useCreateChatroom } from '~/api/chatroom/chatroom'

const ChatIcon = ({ mentorId }: { mentorId: string }) => {
    const router = useRouter()
    const { mutate: createChatroom } = useCreateChatroom()
    return (
        <HiChatBubbleLeftEllipsis
            className="cursor-pointer"
            size={30}
            onClick={async () => {
                createChatroom(
                    { mentorId },
                    {
                        onSuccess(res) {
                            // use mock or it won't work
                            if (res?.data?.chatroomId) {
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
