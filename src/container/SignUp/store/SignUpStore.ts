import { makeAutoObservable } from 'mobx'
import { callMemberSignUp } from '~/api/user/user'
class SignUpStore {
    userName: string = ''
    email: string = ''
    password: string = ''
    avatar: File | null = null

    constructor() {
        makeAutoObservable(this)
    }
    getFromData = (registerName: string) => {
        return this[registerName as keyof SignUpStore]
    }

    memberSignUp = (formData: FormData) => {
        const res = callMemberSignUp(formData)
        return res
    }
}
export default SignUpStore
