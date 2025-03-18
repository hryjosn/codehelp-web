import { makeAutoObservable } from 'mobx'
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
}
export default SignUpStore
