import { baseURL } from '../api'

export const getMentorInfoURL = (mentorId: string) =>
    `${baseURL}/mentor/info/${mentorId}`
