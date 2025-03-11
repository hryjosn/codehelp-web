'use client'

import { HiChatBubbleLeftEllipsis } from 'react-icons/hi2'
import { useRouter } from '~/i18n/routing'
import { RESPONSE_CODE } from '~/container/Login/store/types'
import { useChatroomStore } from '~/container/Chat/store/ChatStore'

const ChatIcon = ({ mentorId }: { mentorId: string }) => {
    const router = useRouter()
    const createChatroom = useChatroomStore((state) => state.createChatroom)
    const getChatroomInfo = useChatroomStore((state) => state.getChatroomInfo)
    return (
        <HiChatBubbleLeftEllipsis
            className="cursor-pointer"
            size={30}
            onClick={async () => {
                const res = await createChatroom(mentorId)
                if (res.chatroomId) {
                    // Waiting Backend renew respond data
                    // Otherwise need to use mock data
                    getChatroomInfo(res.chatroomId)
                    router.push(`/chat/${res.chatroomId}`)
                }
            }}
        />
    )
}
export default ChatIcon
