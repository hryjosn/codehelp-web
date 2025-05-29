'use client'
import PhoneInput from 'react-phone-input-2'
import { Props } from './types'

const PhoneNumberInput = ({ phoneNumber, initialCountry, ...props }: Props) => {
    return (
        <PhoneInput
            country={initialCountry}
            value={phoneNumber}
            inputProps={{
                required: true,
                autoFocus: true,
            }}
            enableSearch
            inputClass="!flex !h-10 !w-full !rounded-md !border !border-input !bg-background !py-2 !text-base !ring-offset-background !file:border-0 !file:bg-transparent !file:text-sm !file:font-medium !file:text-foreground !placeholder:text-muted-foreground !focus-visible:outline-none !focus-visible:ring-2 !focus-visible:ring-ring !focus-visible:ring-offset-2 !disabled:cursor-not-allowed !disabled:opacity-50 !md:text-sm"
            {...props}
        />
    )
}

export default PhoneNumberInput
