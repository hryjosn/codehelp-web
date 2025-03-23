import { MenuItem, Select, SelectProps } from '@mui/material'
import { useEffect } from 'react'

import { Controller, useFormContext } from 'react-hook-form'
import { useStore } from '~/store/rootStoreProvider'

interface FormSelectProps extends Omit<SelectProps, 'name' | 'value'> {
    label: string
    registerName: string
    dataList: Array<string | { name: string; code: string }>
}

const FormSelect = ({
    label,
    registerName,
    dataList,
    multiple,
    ...props
}: FormSelectProps) => {
    const {
        control,
        setValue,
        formState: { errors },
    } = useFormContext()
    const {
        signUpStore: { getFormData },
    } = useStore()
    useEffect(() => {
        if (getFormData(registerName)) {
            setValue(registerName, getFormData(registerName))
        }
    }, [registerName, setValue, getFormData])
    const errorMessage = errors[registerName]?.message as string
    return (
        <div className="flex w-80 flex-col gap-1">
            <p className="font-bold">
                {label}
                <span className="text-red-500"> *</span>
            </p>
            <Controller
                name={registerName}
                control={control}
                defaultValue={''}
                render={({ field }) => {
                    const { value, onChange, onBlur, ...restField } = field
                    return (
                        <Select
                            value={value || (multiple ? [] : '')}
                            onChange={onChange}
                            onBlur={onBlur}
                            className="min-h-10 w-full rounded-lg"
                            multiple={multiple}
                            {...restField}
                            {...props}
                        >
                            {dataList.map((data, index) =>
                                typeof data === 'string' ? (
                                    <MenuItem key={index} value={data}>
                                        {data}
                                    </MenuItem>
                                ) : (
                                    <MenuItem key={index} value={data.code}>
                                        {data.name}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    )
                }}
            />
            <div className="min-h-6 text-center text-red-500">
                {errorMessage}
            </div>
        </div>
    )
}

export default FormSelect
