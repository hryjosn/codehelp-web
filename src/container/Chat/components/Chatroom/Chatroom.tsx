import { Props } from './types'
import Avatar from '~/components/Avatar/Avatar'
import { useRouter } from '~/i18n/routing'
import { cn } from '~/lib/utils'
import { forwardRef } from 'react'

const Chatroom = forwardRef<HTMLButtonElement, Props>((props, ref) => {
    const { userName, avatar, id, className } = props
    const router = useRouter()
    return (
        <button
            ref={ref}
            className={cn(
                'flex w-full items-center rounded-lg px-3 py-3 hover:bg-gray-100',
                className
            )}
            onClick={() => {
                router.push(`/chat/${id}`)
            }}
        >
            <Avatar src={avatar} />
            <p className="ml-4">{userName}</p>
        </button>
    )
})

Chatroom.displayName = 'Chatroom'
export default Chatroom
