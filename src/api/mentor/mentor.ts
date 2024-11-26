import { useQuery } from '@tanstack/react-query'
import apiHandler from '../api'
import { getMentorInfoURL } from './api_url'

export const useGetMentorInfo = (mentorId: string) => {
    return useQuery({
        queryKey: ['mentorInfo', mentorId],
        queryFn: async () => {
            const res = await apiHandler({
                url: getMentorInfoURL(mentorId),
                method: 'get',
            })
            return res.data.mentor
        },
    })
}
