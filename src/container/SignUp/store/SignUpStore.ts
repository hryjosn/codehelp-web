import { makeAutoObservable } from 'mobx'
class SignUpStore {
    userName: string = ''
    gender: string = ''
    country: string = ''
    title: string = ''
    company: string = ''
    years: string = ''
    linkedIn: string = ''
    work: string = ''
    level: string = ''
    introduction: string = ''
    role: string = ''
    phoneNumber: string = ''
    expertise: string[] = []
    disciplines: string[] = []
    skills: string[] = []
    tools: string[] = []
    constructor() {
        makeAutoObservable(this)
    }
    getFromData = (registerName: string) => {
        return this[registerName as keyof SignUpStore]
    }
}
export default SignUpStore
