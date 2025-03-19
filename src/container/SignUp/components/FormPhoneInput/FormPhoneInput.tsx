import { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import rootStore from '~/store'
import { MuiTelInput } from 'mui-tel-input'
interface FormPhoneInputProps {
    registerName: string
    label: string
}

const FormPhoneInput = ({ label, registerName }: FormPhoneInputProps) => {
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
        <div className="flex w-full flex-col items-center">
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
                        <MuiTelInput
                            className="min-h-10 w-80 rounded-lg"
                            defaultCountry="TW"
                            {...field}
                        />
                    )}
                />
            </div>
            <div className="mt-1 min-h-6 text-center text-sm text-red-500">
                {errorMessage}
            </div>
        </div>
    )
}

export default FormPhoneInput
