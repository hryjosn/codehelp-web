import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { UpdateMemberInfoData } from './types'

export const useUpdateMemberInfo = () => {
    return useMutation({
        mutationFn: async (data: UpdateMemberInfoData) => {
            const res = await axios.put('/api/member/info', { data })
            return res.data
        },
    })
}
