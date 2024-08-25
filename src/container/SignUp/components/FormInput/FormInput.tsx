import TextField from '@mui/material/TextField'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'

export interface FormInputProps {
    placeholder?: string
    type?: string
    value?: string
    register: UseFormRegister<any>
    registerLabel: string
}

const FormInput = ({
    placeholder,
    register,
    type,
    registerLabel,
    value,
}: FormInputProps) => {
    const { ref: inputRef, ...inputProps } = register(registerLabel)
    return (
        <TextField
            InputProps={{
                style: {
                    borderRadius: '8px',
                    height: '48px',
                    width: '240px',
                },
            }}
            placeholder={placeholder}
            inputRef={inputRef}
            value={value}
            type={type}
            {...inputProps}
        />
    )
}

export default FormInput