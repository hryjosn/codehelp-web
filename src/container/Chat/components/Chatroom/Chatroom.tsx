import { Props } from './types'
import Image from 'next/image'
import { useRouter } from '~/i18n/routing'

const Chatroom = (props: Props) => {
    const { userName, avatar, id } = props
    const router = useRouter()
    return (
        <button
            className="flex w-full items-center rounded-lg px-3 py-3 hover:bg-gray-100"
            onClick={() => {
                router.push(`/chat/${id}`)
            }}
        >
            <Image
                className="min-h-12 min-w-12 rounded-full"
                src={avatar}
                alt="education"
                width="48"
                height="48"
            />
            <p className="ml-4">{userName}</p>
        </button>
    )
}

export default Chatroom
