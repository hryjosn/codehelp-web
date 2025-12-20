'use client'

import Image from 'next/image'
import { Props } from './types'
import { cn } from '~/lib/utils'

const ImageButton = ({ className, src, onClick }: Props) => {
    return (
        <button
            className={(cn('hover:opacity-50'), className)}
            onClick={onClick}
        >
            <Image
                className="h-20 w-20 object-cover"
                src={src}
                alt=""
                width={0}
                height={0}
            />
        </button>
    )
}

export default ImageButton
