import { ChangeEvent } from 'react'

export interface Props {
    value: string
    maxRows?: number
    placeholder?: string
    onClick: () => void
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
