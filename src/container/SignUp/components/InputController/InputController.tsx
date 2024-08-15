import React from 'react'
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form'
import Input from '../Input/Input'
interface InputControllerProps {
    placeholder: string
    label: string
    name: string
    control: Control<FieldValues>
    errors?: FieldErrors<FieldValues>
    props?: any
}
const InputController = ({
    placeholder,
    label,
    name,
    control,
    errors,
    props,
}: InputControllerProps) => {
    return (
        <div>
            <p>{label}</p>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Input placeholder={placeholder} {...field} />
                )}
                {...props}
            />
            {errors && errors.name && errors.name.type === 'maxLength' && (
                <span>Max length exceeded</span>
            )}
        </div>
    )
}

export default InputController
