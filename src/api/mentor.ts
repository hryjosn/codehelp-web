import { useQuery } from '@tanstack/react-query'
import apiHandler from './api'

export const useMentorInfo = (mentorId: string) => {
    return useQuery({
        queryKey: ['mentorInfo', mentorId],
        queryFn: async () => {
            const res = await apiHandler({
                url: `/mentor/info/${mentorId}`,
                method: 'get',
            })
            return res.data.mentor
        },
    })
}
