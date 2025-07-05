'use client'

import { Props } from './types'
import Avatar from '~/components/Avatar/Avatar'

const ChattingAreaHeader = ({ avatar, userName }: Props) => {
    return (
        <div className="flex items-center border-b px-3 pb-3">
            <Avatar src={avatar} />
            <p className="ml-3 font-bold">{userName}</p>
        </div>
    )
}

export default ChattingAreaHeader
