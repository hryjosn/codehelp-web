import { makeAutoObservable } from 'mobx'
class SignUpStore {
    avatar: string = ''
    name: string = ''
    company: string = ''
    title: string = ''

    constructor() {
        makeAutoObservable(this)
    }
}
export default SignUpStore
