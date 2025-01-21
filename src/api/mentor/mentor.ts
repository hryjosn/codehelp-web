import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { MentorT } from '~/container/Home/store/type'
import apiHandler from '../api'
import { getMentorInfoURL, saveScheduleURL } from './api_url'
import { ScheduleReqT, ScheduleResT } from './types'

interface MentorListResT {
    mentorList: MentorT[]
    status: string
    total: number
}
interface MentorInfoResT {
    mentor: MentorT
    status: string
}
export const useGetMentorInfo = (mentorId: string) => {
    return useQuery({
        queryKey: ['mentorInfo', mentorId],
        queryFn: async () => {
            const res = await apiHandler<MentorInfoResT>({
                url: getMentorInfoURL(mentorId),
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

export const useSaveSchedule = () => {
    return useMutation({
        mutationFn: async (data: ScheduleReqT) => {
            const res = await apiHandler<ScheduleReqT, ScheduleResT>({
                url: saveScheduleURL,
                method: 'post',
                data: data.data,
            })
            return res.data
        },
    })
}
