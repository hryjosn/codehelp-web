import { GetTimeSlotVariantProps, TimeCode } from './types'
import { format, parseISO } from 'date-fns'

export const convertTimeCode = (timeCode: number) => {
    const utcTime = `1970-01-01T${TimeCode[timeCode]}`
    const convertTime = format(parseISO(utcTime), 'HH:mm')

    return convertTime
}

export const getTimeSlotVariant = ({
    bookedTimeCodeList,
    currentTimeCode,
}: GetTimeSlotVariantProps) => {
    if (bookedTimeCodeList.length <= 0) return 'primary'

    const haveBooked = bookedTimeCodeList?.find(
        (timeCode) => timeCode === currentTimeCode
    )

    return haveBooked ? 'danger' : 'primary'
}
