import fetchApi from '~/utils/fetch'
import { GetMentorInfoHandlerResT } from './types'

export const callGetMentorInfoHandler = async (mentorId: string) => {
    try {
        const res = await fetchApi<unknown, GetMentorInfoHandlerResT>({
            url: `/api/mentor/info/${mentorId}`,
            method: 'GET',
        })

        return res
    } catch (error) {
        console.error('Error fetching user info:', error)
        throw error
    }
}
