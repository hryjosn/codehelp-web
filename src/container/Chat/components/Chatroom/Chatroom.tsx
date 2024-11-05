import { Props } from './types'
import Image from 'next/image'

const Chatroom = (props: Props) => {
    const { userName, avatar } = props
    return (
        <button className="flex w-full items-center rounded-lg px-3 py-3 hover:bg-gray-100">
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
