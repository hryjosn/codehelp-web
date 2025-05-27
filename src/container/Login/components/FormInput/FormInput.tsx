import React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslations } from 'next-intl'

export type FormInputProps = {
    title: string
    valueName: string
} & TextFieldProps

const FormInput = ({ title, valueName, ...restProps }: FormInputProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()
    const t = useTranslations('Login')

    const rawError = errors[valueName]?.message as string
    const errorMessage = rawError ? t(rawError) : ''

    return (
        <div className="flex flex-col items-center gap-1">
            <div>
                <p>{title}</p>
                <Controller
                    name={valueName}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            InputProps={{
                                style: {
                                    borderRadius: '8px',
                                    height: '48px',
                                    width: '300px',
                                },
                            }}
                            {...field}
                            {...restProps}
                        />
                    )}
                />
            </div>
            <div className="min-h-6 text-red-500">{errorMessage}</div>
        </div>
    )
}

export default FormInput
