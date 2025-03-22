import { Props } from './types'
import Avatar from '~/components/Avatar/Avatar'
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
            <Avatar src={avatar} />
            <p className="ml-4">{userName}</p>
        </button>
    )
}

export default Chatroom
