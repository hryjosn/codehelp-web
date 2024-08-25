import TextField from '@mui/material/TextField'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'

export interface FormInputProps {
    placeholder?: string
    type?: string
    defaultValue?: string
    register: UseFormRegister<any>
    registerLabel: string
}

const FormInput = ({
    placeholder,
    register,
    type,
    registerLabel,
    defaultValue,
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
            defaultValue={defaultValue}
            type={type}
            {...inputProps}
        />
    )
}

export default FormInput
