import { useChatroomStore } from '../../store/ChatStore'
import { Props } from './types'
import Image from 'next/image'

const Chatroom = (props: Props) => {
    const { userName, avatar } = props
    const getChatroomInfo = useChatroomStore((state) => state.getChatroomInfo)
    return (
        <button
            className="flex w-full items-center rounded-lg px-3 py-3 hover:bg-gray-100"
            onClick={() => {
                getChatroomInfo(props.id)
            }}
        >
            <Image
                className="max-h-12 max-w-12 rounded-full"
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
