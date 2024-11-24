import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import apiHandler from './api'
import { MentorT } from '~/container/Home/store/type'

interface MentorListResT {
    mentorList: MentorT[]
    status: string
    total: number
}
export const useGetMentorInfo = (mentorId: string) => {
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
export const useGetMentorList = () => {
    return useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['mentorList'],
        queryFn: async ({ pageParam }) => {
            const pageSize = 10
            const {
                data: { total, mentorList },
            } = await apiHandler<MentorListResT>({
                url: `/mentor/list?page=${pageParam}&count=${pageSize}`,
                method: 'get',
            })

            return { mentorList, total, pageParam, pageSize }
        },
        getNextPageParam: (res) => {
            if (res.pageParam * res.pageSize < res.total) {
                return res.pageParam + 1
            }
            return undefined
        },
    })
}
