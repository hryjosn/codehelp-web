import { baseURL } from '../api'

export const getMentorInfoURL = (mentorId: string) =>
    `${baseURL}/mentor/info/${mentorId}`

export const getMentorListURL = `${baseURL}/mentor/list`

export const updateAvailableTimeURL = `${baseURL}/mentor/updateAvailableTime`

export const updateMentorInfoURL = `${baseURL}/mentor/update/info`

export const updateMentorDisciplinesURL = `${baseURL}/mentor/update/disciplines`

export const updateMentorSkillsURL = `${baseURL}/mentor/update/skills`

export const updateMentorToolsURL = `${baseURL}/mentor/update/tools`
