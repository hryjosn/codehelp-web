import TextField, { StandardTextFieldProps } from '@mui/material/TextField'
import classNames from 'classnames'
import React from 'react'

const Input = ({ className, ...props }: StandardTextFieldProps) => {
    return (
        <TextField
            InputProps={{
                style: {
                    borderRadius: '8px',
                    height: '48px',
                },
            }}
            className={classNames('w-full', className)}
            {...props}
        />
    )
}

export default Input
