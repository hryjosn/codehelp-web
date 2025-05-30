import { PhoneInputProps } from 'react-phone-input-2'

export interface Props extends PhoneInputProps {
    phoneNumber: string
    initialCountry: string
}
