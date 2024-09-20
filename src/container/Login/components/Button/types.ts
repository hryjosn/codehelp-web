import { FieldErrors } from 'react-hook-form'

export interface ButtonT {
    title: string
    errors: FieldErrors<{
        email: string
        password: string
    }>
}
