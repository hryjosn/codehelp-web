import { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useStore } from '~/store/rootStoreProvider'
import PhoneInput, { CountryData } from 'react-phone-input-2'

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
        signUpStore: { getFormData, setCountryCode },
    } = useStore()
    useEffect(() => {
        if (getFormData(registerName)) {
            setValue(registerName, getFormData(registerName))
        }
    }, [registerName, setValue, getFormData])
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
                    render={({ field: { onChange, onBlur } }) => (
                        <PhoneInput
                            inputClass="!min-h-14 !w-80 !rounded-lg"
                            country={'tw'}
                            inputProps={{
                                required: true,
                                autoFocus: true,
                            }}
                            enableSearch
                            onChange={(value: string, data: CountryData) => {
                                setCountryCode(data.dialCode)
                                onChange(value)
                            }}
                            onBlur={onBlur}
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
