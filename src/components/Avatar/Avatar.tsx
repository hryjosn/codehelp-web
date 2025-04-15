import Image from 'next/image'
import { Props } from './types'

const Avatar = ({ src }: Props) => {
    return (
        <div className="relative min-h-12 min-w-12 rounded-full">
            <Image
                className="rounded-full"
                src={src ? src : '/Avatar/defaultAvatar.jpg'}
                alt=""
                fill
            />
        </div>
    )
}

export default Avatar
