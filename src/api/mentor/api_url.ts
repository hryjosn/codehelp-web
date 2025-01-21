import { baseURL } from '../api'

export const getMentorInfoURL = (mentorId: string) =>
    `${baseURL}/mentor/info/${mentorId}`

export const saveScheduleURL = `${baseURL}/mentor/schedule`
