import React, { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import Input from '../FormInput/FormInput'
export interface FormControllerProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

const FormController = ({ label, type, ...props }: FormControllerProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const errorMessage = errors[label]?.message

    return (
        <div className="flex flex-col items-center gap-1">
            <div>
                <p className="text-sm">{label}</p>
                <Input register={register} registerName={label} {...props} />
            </div>
            {errorMessage && typeof errorMessage === 'string' && (
                <p className="text-red-400 text-base">{errorMessage}</p>
            )}
        </div>
    )
}

export default FormController
