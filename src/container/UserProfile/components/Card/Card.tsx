import * as React from 'react'

import { cn } from '~/lib/utils'
import CardHeader from '../CardHeader/CardHeader'
import { CardContent } from '../card'
import { Props } from './types'

const Card = ({
    className,
    headerTitle,
    content,
    isButtonVisible,
    onClick,
    ...props
}: Props) => (
    <div
        className={cn(
            'bg-card text-card-foreground rounded-lg border shadow-sm',
            className
        )}
        {...props}
    >
        <CardHeader
            className="pb-2"
            title={headerTitle}
            isButtonVisible={isButtonVisible}
            onClick={() => {
                if (onClick) onClick()
            }}
        />
        <CardContent>{content}</CardContent>
    </div>
)

export default Card
