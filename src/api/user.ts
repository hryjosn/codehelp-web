import { LoginDataT } from '~/container/Login/store/types'
import apiHandler from './api'

export const callLogin = (data: LoginDataT) => {
    return apiHandler({
        url: '/login',
        method: 'post',
        data,
    })
}
