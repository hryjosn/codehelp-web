import { makeAutoObservable } from 'mobx'
import { callMemberSignUp, callMentorSignUp } from '~/api/user/user'
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
    mentorSignUp = (formData: FormData) => {
        const res = callMentorSignUp(formData)
        return res
    }

    memberSignUp = (formData: FormData) => {
        const res = callMemberSignUp(formData)
        return res
    }
}
export default SignUpStore
