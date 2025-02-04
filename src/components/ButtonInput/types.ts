import { ChangeEvent } from 'react'

export interface Props {
    maxRows?: number
    placeholder?: string
    onClick: () => void
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
