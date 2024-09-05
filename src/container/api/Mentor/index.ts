import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { IGetMentorInfo, IGetMentorLists } from './types'
import { formatFullURL } from '../utils'

export const useGetMentors = () => {
    return useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['mentors'],
        queryFn: async ({ pageParam }): Promise<IGetMentorLists> => {
            const requestURL = formatFullURL({
                apiEndpoint: '/mentor/list',
                pageParams: {
                    page: pageParam.toString(),
                    count: '10',
                },
            })
            const res = await fetch(requestURL, { method: 'GET' })
            const data = await res.json()

            return { data, pageParam }
        },
        getNextPageParam: (res) => {
            if (res.pageParam * 10 < res.data.total) {
                return res.pageParam + 1
            }
            return undefined
        },
    })
}

export const useGetMentorInfo = (id: string) => {
    return useQuery({
        queryKey: ['mentor', id],
        queryFn: async (): Promise<IGetMentorInfo> => {
            const requestURL = formatFullURL({
                apiEndpoint: `/mentor/info`,
                id,
            })
            const res = await fetch(requestURL, { method: 'GET' })
            const data = await res.json()

            return data
        },
    })
}
