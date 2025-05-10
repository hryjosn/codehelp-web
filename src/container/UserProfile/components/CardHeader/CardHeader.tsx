import * as React from 'react'
import { cn } from '~/lib/utils'
import { Props } from './types'
import { CardTitle } from '../card'
import { Button } from '../button'
import { Edit } from 'lucide-react'

const CardHeader = ({
    className,
    title,
    isButtonVisible,
    onClick,
    ...props
}: Props) => (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
        <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            {isButtonVisible && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={onClick}
                >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
            )}
        </div>
    </div>
)

export default CardHeader
