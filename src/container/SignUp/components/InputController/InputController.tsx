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

    return (
        <div className="flex flex-col gap-1">
            <p className="text-sm">{label}</p>

            <Input
                placeholder={placeholder}
                register={register}
                label={label}
                type={type}
            />

            {typeof errors[label]?.message === 'string' && (
                <p className="text-red-400 text-base">
                    {errors[label].message}
                </p>
            )}
        </div>
    )
}

export default InputController
