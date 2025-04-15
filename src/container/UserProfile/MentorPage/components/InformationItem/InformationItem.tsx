'use client'

import { Props } from './types'
import { cn } from '~/lib/utils'

const InformationItem = ({ title, content, className }: Props) => {
    return (
        <div className={cn('flex space-x-3', className)}>
            <p className="font-bold">{title}</p>
            <p>{content}</p>
        </div>
    )
}

export default InformationItem
