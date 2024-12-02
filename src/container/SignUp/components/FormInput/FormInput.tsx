import TextField, { TextFieldProps } from '@mui/material/TextField'
import { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import rootStore from '~/store'

export type FormInputProps = {
    registerName: string
    label: string
} & TextFieldProps

const FormInput = ({ label, registerName, ...restProps }: FormInputProps) => {
    const {
        control,
        setValue,
        formState: { errors },
    } = useFormContext()
    const {
        signUpStore: { getFromData },
    } = rootStore
    useEffect(() => {
        if (getFromData(registerName)) {
            setValue(registerName, getFromData(registerName))
        }
    }, [registerName, setValue, getFromData])
    const errorMessage = errors[registerName]?.message as string
    return (
        <div className="flex w-full flex-col items-center gap-1">
            <div>
                <p className="font-bold">
                    {label}
                    <span className="text-red-500"> *</span>
                </p>
                <Controller
                    name={registerName}
                    control={control}
                    defaultValue={''}
                    render={({ field }) => (
                        <TextField
                            className="min-h-10 w-80 rounded-lg"
                            {...field}
                            {...restProps}
                        />
                    )}
                />
            </div>
            <div className="min-h-6 text-center text-sm text-red-500">
                {errorMessage}
            </div>
        </div>
    )
}

export default FormInput
