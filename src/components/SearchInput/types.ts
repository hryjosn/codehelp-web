import { ChangeEvent, FormEvent } from 'react'

export interface Props {
    value: string
    placeholder: string
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
