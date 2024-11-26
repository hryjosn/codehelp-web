import { useQuery } from '@tanstack/react-query'
import apiHandler, { baseURL } from '../api'

export const getMentorInfoURL = `${baseURL}mentor/info/`
export const useGetMentorInfo = (mentorId: string) => {
    return useQuery({
        queryKey: ['mentorInfo', mentorId],
        queryFn: async () => {
            const res = await apiHandler({
                url: getMentorInfoURL + mentorId,
                method: 'get',
            })
            return res.data.mentor
        },
    })
}
