import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { UpdatePhoneNumberParams } from './types'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const refactorPhoneNumber = ({
    phoneNumber,
    countryCode,
}: UpdatePhoneNumberParams) => {
    return (
        `+${countryCode}` +
        phoneNumber.replace(countryCode, '').replace(/^0+/, '')
    )
}
