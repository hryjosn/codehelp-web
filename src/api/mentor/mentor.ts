import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { MentorT } from '~/api/mentor/types'
import apiHandler from '../api'
import { getMentorInfoURL, saveAppointmentURL } from './route'
import { AppointmentReq, AppointmentResWrapData } from './types'

interface MentorListResT {
    mentorList: MentorT[]
    status: string
    total: number
}
interface MentorInfoResT {
    mentor: MentorT
    status: string
}
export const getMentorInfo = async (mentorId: string) => {
    const res = await apiHandler<MentorInfoResT>({
        url: getMentorInfoURL(mentorId),
        method: 'get',
    })
    return res.data.mentor
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
export const getMentorList = async ({
    pageParam,
    pageSize,
}: {
    pageParam: number
    pageSize: number
}) => {
    const { data } = await apiHandler<MentorListResT>({
        url: `/mentor/list`,
        method: 'get',
        params: { page: pageParam, count: pageSize },
    })
    return data
}
export const useGetMentorList = () => {
    return useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['mentorList'],
        queryFn: async ({ pageParam }: { pageParam: number }) => {
            const pageSize = 10
            const {
                data: { total, mentorList },
            } = await apiHandler<MentorListResT>({
                url: `/mentor/list`,
                method: 'get',
                params: { page: pageParam, count: pageSize },
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

export const useSaveAppointment = () => {
    return useMutation({
        mutationFn: async (data: AppointmentReq) => {
            const res = await apiHandler<
                AppointmentReq,
                AppointmentResWrapData
            >({
                url: saveAppointmentURL,
                method: 'post',
                data,
            })
            return res.data
        },
    })
}
