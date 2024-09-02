import TextField, { TextFieldProps } from '@mui/material/TextField'
import { UseFormRegister } from 'react-hook-form'

import { SignUpInputT } from '~/container/SignUp/store/types'

export type FormInputProps = {
    register: UseFormRegister<SignUpInputT>
    registerName: 'email' | 'password' | 'userName'
} & TextFieldProps
const FormInput = ({ register, registerName, ...props }: FormInputProps) => {
    const { ref: inputRef, ...inputProps } = register(registerName)
    return (
        <TextField
            InputProps={{
                style: {
                    borderRadius: '8px',
                    height: '48px',
                    width: '240px',
                },
            }}
            inputRef={inputRef}
            {...inputProps}
            {...props}
        />
    )
}

export default FormInput
