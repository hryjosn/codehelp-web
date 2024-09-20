import { MenuItem, Select, SelectProps } from '@mui/material'
import { useEffect } from 'react'

import { Controller, useFormContext } from 'react-hook-form'
import rootStore from '~/store'

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
        signUpStore: { getFromData },
    } = rootStore
    useEffect(() => {
        if (getFromData(registerName)) {
            setValue(registerName, getFromData(registerName))
        }
    }, [registerName, setValue, getFromData])
    const errorMessage = errors[registerName]?.message as string
    return (
        <div className="w-80 flex flex-col gap-1">
            <p className="font-bold">{label}</p>
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
                            className="min-h-10 rounded-lg w-full"
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
            <div className="text-red-500 min-h-6 text-center">
                {errorMessage}
            </div>
        </div>
    )
}

export default FormSelect
