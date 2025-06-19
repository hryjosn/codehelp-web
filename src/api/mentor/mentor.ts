import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import {
    MentorT,
    UpdateMentorDisciplinesParams,
    UpdateMentorSkillsParams,
    UpdateMentorToolsParams,
} from '~/api/mentor/types'
import apiHandler from '../api'
import { saveAppointmentURL, getMentorListURL } from './route'
import {
    AppointmentReq,
    AppointmentResWrapData,
    UpdateMentorInfoParams,
} from './types'
import axios from 'axios'

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
    const res = await axios.get<MentorInfoResT>(`/api/mentor/info/${mentorId}`)
    return res.data.mentor
}

export const useGetMentorInfo = (mentorId: string) => {
    return useQuery<MentorT>({
        queryKey: ['mentorInfo', mentorId],
        queryFn: async () => {
            const res = await axios.get(`/api/mentor/info/${mentorId}`)
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
    const res = await fetch(
        `${getMentorListURL}?page=${pageParam}&count=${pageSize}`,
        {
            method: 'GET',
            next: { tags: ['mentorList'], revalidate: 300 },
        }
    )

    if (!res.ok) {
        throw new Error('Failed to fetch mentor list')
    }

    const data: MentorListResT = await res.json()
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

export const useUpdateMentorInfo = () => {
    return useMutation({
        mutationFn: async (data: UpdateMentorInfoParams) => {
            const res = await axios.put('/api/mentor/info', { data })
            return res.data
        },
    })
}

export const useUpdateMentorDisciplines = () => {
    return useMutation({
        mutationFn: async (data: UpdateMentorDisciplinesParams) => {
            const res = await axios.put('/api/mentor/disciplines', { data })
            return res.data
        },
    })
}

export const useUpdateMentorSkills = () => {
    return useMutation({
        mutationFn: async (data: UpdateMentorSkillsParams) => {
            const res = await axios.put('/api/mentor/skills', { data })
            return res.data
        },
    })
}

export const useUpdateMentorTools = () => {
    return useMutation({
        mutationFn: async (data: UpdateMentorToolsParams) => {
            const res = await axios.put('/api/mentor/tools', { data })
            return res.data
        },
    })
}
