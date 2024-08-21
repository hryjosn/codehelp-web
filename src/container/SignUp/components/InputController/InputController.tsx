import React from 'react'
import { useFormContext } from 'react-hook-form'
import Input from '../Input/Input'
interface InputControllerProps {
    placeholder: string
    label: string
    type?: string
}

const InputController = ({
    placeholder,
    label,
    type,
}: InputControllerProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const errorMessage = errors[label]?.message
    return (
        <div className="flex flex-col gap-1">
            <p className="text-sm">{label}</p>

            <Input
                placeholder={placeholder}
                register={register}
                label={label}
                type={type}
            />

            {errorMessage && typeof errorMessage === 'string' && (
                <p className="text-red-400 text-base">{errorMessage}</p>
            )}
        </div>
    )
}

export default InputController
