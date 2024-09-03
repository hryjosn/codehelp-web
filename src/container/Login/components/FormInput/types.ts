import { UseFormRegister, ValidationRule } from 'react-hook-form'

export interface LoginInputT {
    title: string
    valueName: 'email' | 'password'
    type?: string
    errors?: string
    register: UseFormRegister<{
        email: string
        password: string
    }>
    required?: string | ValidationRule<boolean> | undefined
    pattern?: ValidationRule<RegExp> | undefined
}
