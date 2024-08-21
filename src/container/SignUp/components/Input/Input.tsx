import TextField from '@mui/material/TextField'
import classNames from 'classnames'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'

export interface InputProps {
    placeholder: string
    className?: string
    register: UseFormRegister<any>
    type?: string
    label: string
    required?: boolean
}

const Input = React.forwardRef(
    ({
        placeholder,
        className,
        register,
        type,
        label,
        required,
        ...props
    }: InputProps) => {
        const { ref: inputRef, ...inputProps } = register(label)
        return (
            <TextField
                InputProps={{
                    style: {
                        borderRadius: '8px',
                        height: '48px',
                    },
                }}
                label={label}
                placeholder={placeholder}
                className={classNames('w-full', className)}
                inputRef={inputRef}
                type={type}
                {...inputProps}
                {...props}
            />
        )
    }
)

export default Input
