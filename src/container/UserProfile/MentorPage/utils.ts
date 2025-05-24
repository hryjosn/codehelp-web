import prettyMilliseconds from 'pretty-ms'
import { AdjustMinuteToHour, TimeCode } from './types'
import { format, parseISO } from 'date-fns'
import { useEditProfileModalStore } from './components/EditProfileModal/store/EditProfileModalStore'
import compressImage from '~/utils/compressImage'
import educationList from '~/constant/data/education.json'

const { setNewMentorInfo, setAvatarFile } = useEditProfileModalStore.getState()

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

export const convertTimeCode = (timeCode: number) => {
    const utcTime = `1970-01-01T${TimeCode[timeCode - 1]}`
    const convertTime = format(parseISO(utcTime), 'h:mm a')

    return convertTime
}

export const inputChange = (
    event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
) => {
    const { name, value } = event.target
    setNewMentorInfo({ [name]: value })
}

export const selectChange = ({
    name,
    value,
}: {
    name: string
    value: string | boolean
}) => {
    setNewMentorInfo({ [name]: value })
}

export const avatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
) => {
    if (event.target.files && event.target.files[0]) {
        const compressedImage = await compressImage(event)
        if (compressedImage) {
            const imageURL = URL.createObjectURL(compressedImage)
            setAvatarFile(compressedImage)
            setNewMentorInfo({ avatar: imageURL })
        }
    }
}

export const educationChange = (code: string) => {
    const selectedLevel = educationList.find((data) => data.code === code)
    if (selectedLevel) {
        setNewMentorInfo({
            education: selectedLevel.code,
        })
    }
}
