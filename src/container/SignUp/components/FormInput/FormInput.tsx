import TextField, { TextFieldProps } from '@mui/material/TextField';
import { UseFormRegister } from 'react-hook-form';

import { DataProps } from '~/container/SignUp/store/types';


export type FormInputProps = {
    register: UseFormRegister<DataProps>
    registerName: "email" | "password" | "userName"
  } & TextFieldProps;
const FormInput = ({
    register,
    registerName,
}: FormInputProps) => {
    const { ref: inputRef, ...inputProps } = register(registerName);
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
        />
    )
}

export default FormInput
