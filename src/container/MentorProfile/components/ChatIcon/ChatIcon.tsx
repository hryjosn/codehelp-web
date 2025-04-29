'use client'

import { HiChatBubbleLeftEllipsis } from 'react-icons/hi2'
import { useRouter } from '~/i18n/routing'
import { useCreateChatroom } from '~/api/chatroom/chatroom'
import { useQueryClient } from '@tanstack/react-query'

const ChatIcon = ({ mentorId }: { mentorId: string }) => {
    const router = useRouter()
    const { mutate: createChatroom } = useCreateChatroom()
    const queryClient = useQueryClient()
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
                                queryClient.invalidateQueries({
                                    queryKey: ['chatroomList'],
                                })
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
