import { LoginDataT } from '~/container/Login/store/type'
import apiHandler from './api'

export const callMemberLogin = (data: LoginDataT) => {
    return apiHandler({
        url: '/member/login',
        method: 'post',
        data,
    })
}
