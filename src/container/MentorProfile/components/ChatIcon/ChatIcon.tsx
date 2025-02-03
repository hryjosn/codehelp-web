'use client'

import { HiChatBubbleLeftEllipsis } from 'react-icons/hi2'
import { useRouter } from 'next/navigation'
import { RESPONSE_CODE } from '~/container/Login/store/types'
import { useChatroomStore } from '~/container/Chat/store/ChatStore'

const ChatIcon = ({ mentorId }: { mentorId: string }) => {
    const router = useRouter()
    const createChatroom = useChatroomStore((state) => state.createChatroom)
    return (
        <HiChatBubbleLeftEllipsis
            className="cursor-pointer"
            size={30}
            onClick={async () => {
                const res = await createChatroom(mentorId)
                if (res === RESPONSE_CODE.DATA_DUPLICATE || res.chatroomId) {
                    router.push('/chat')
                }
            }}
        />
    )
}
export default ChatIcon
