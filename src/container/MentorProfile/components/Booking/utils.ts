import { TimeCode } from './types'
import { format, parseISO } from 'date-fns'

export const convertTimeCode = (timeCode: number) => {
    const utcTime = `1970-01-01T${TimeCode[timeCode]}`
    const convertTime = format(parseISO(utcTime), 'HH:mm')

    return convertTime
}
