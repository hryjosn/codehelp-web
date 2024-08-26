import React from 'react'
import TextField from '@mui/material/TextField'
import { LoginInputT } from './types'

const FormInput = (props: LoginInputT) => {
    const { title, valueName, errors, required, pattern, register } = props

    return (
        <>
            <p>{title}</p>
            <TextField
                InputProps={{
                    style: {
                        borderRadius: '8px',
                        height: '48px',
                    },
                }}
                {...register(valueName, { required, pattern })}
            />
            {errors && <p className="text-red-500">{errors}</p>}
        </>
    )
}

export default FormInput
