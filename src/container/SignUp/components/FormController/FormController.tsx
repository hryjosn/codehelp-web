import React from 'react'
import { useFormContext } from 'react-hook-form'
import Input from '../FormInput/FormInput'
interface FormControllerProps {
    placeholder: string
    label: string
    type?: string
}

const FormController = ({ placeholder, label, type }: FormControllerProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const errorMessage = errors[label]?.message
    return (
        <div className="flex flex-col items-center gap-1">
            <div>
                <p className="text-sm">{label}</p>
                <Input
                    placeholder={placeholder}
                    register={register}
                    registerLabel={label}
                    type={type}
                />
            </div>
            {errorMessage && typeof errorMessage === 'string' && (
                <p className="text-red-400 text-base">{errorMessage}</p>
            )}
        </div>
    )
}

export default FormController
