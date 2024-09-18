import { makeAutoObservable } from 'mobx'
import { callMemberSignUp, callMentorSignUp } from '~/api/user'
class SignUpStore {
    userName: string = ''
    email: string = ''
    password: string = ''
    avatar: string = ''
    gender: string = ''
    country: string = ''
    title: string = ''
    company: string = ''
    years: string = ''
    linkedIn: string = ''
    level: string = ''
    introduction: string = ''
    phoneNumber: string = ''
    work: string[] = []
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
    mentorSignUp = () => {
        const data = {
            userName: this.userName,
            password: this.password,
            email: this.email,
            avatar: this.avatar,
            gender: this.gender,
            country: this.country,
            title: this.title,
            company: this.company,
            introduction: this.introduction,
            phoneNumber: this.phoneNumber,
            level: Number(this.years),
            linkedInURL: this.linkedIn,
            primaryExpertise: this.expertise[0],
            secondaryExpertise: this.expertise[1] || '',
            tertiaryExpertise: this.expertise[2] || '',
            disciplines: this.disciplines,
            skills: this.skills,
            tools: this.tools,
        }
        const res = callMentorSignUp(data)
    }
    memberSignUp = () => {
        const data = {
            userName: this.userName,
            password: this.password,
            email: this.email,
            avatar: this.avatar,
            gender: this.gender,
            country: this.country,
            title: this.title,
            company: this.company,
            introduction: this.introduction,
            phoneNumber: this.phoneNumber,
            level: Number(this.level),
            fieldOfWork: this.work,
        }
        const res = callMemberSignUp(data)
    }
}
export default SignUpStore
