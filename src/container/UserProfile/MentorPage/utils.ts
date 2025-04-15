import prettyMilliseconds from 'pretty-ms'
import { AdjustMinuteToHour } from './types'

export const adjustTimeZone = (date: Date) => {
    const newDate = new Date(date)
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const localTime = newDate.toLocaleTimeString('en-US', {
        month: 'short',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: timeZone,
    })

    return localTime
}

export const adjustMinuteToHour = ({ minute, t }: AdjustMinuteToHour) => {
    const refactorTime = prettyMilliseconds(minute * 60 * 1000)

    return refactorTime.replace('h', t('h')).replace('m', t('m'))
}
