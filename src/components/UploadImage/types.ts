import { ChangeEvent } from 'react'

export interface Props {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
