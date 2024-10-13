import { makeAutoObservable } from 'mobx'
import { callMemberSignUp, callMentorSignUp } from '~/api/user'
class SignUpStore {
    userName: string = ''
    email: string = ''
    password: string = ''
    avatar: File[] = []
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
        const formData = new FormData()

        formData.append('userName', this.userName)
        formData.append('password', this.password)
        formData.append('email', this.email)
        formData.append(`avatar`, this.avatar[0])
        formData.append('gender', this.gender)
        formData.append('country', this.country)
        formData.append('title', this.title)
        formData.append('company', this.company)
        formData.append('introduction', this.introduction)
        formData.append('phoneNumber', this.phoneNumber)
        formData.append('linkedInURL', this.linkedIn)
        formData.append('primaryExpertise', this.expertise[0])
        formData.append('secondaryExpertise', this.expertise[1] || '')
        formData.append('tertiaryExpertise', this.expertise[2] || '')
        formData.append('disciplines[]', JSON.stringify(this.disciplines))
        formData.append('skills[]', JSON.stringify(this.skills))
        formData.append('tools[]', JSON.stringify(this.tools))
        return callMentorSignUp(formData)
    }

    memberSignUp = () => {
        const formData = new FormData()

        formData.append('userName', this.userName)
        formData.append('password', this.password)
        formData.append(`avatar`, this.avatar[0])
        formData.append('email', this.email)
        formData.append('gender', this.gender)
        formData.append('country', this.country)
        formData.append('title', this.title)
        formData.append('company', this.company)
        formData.append('introduction', this.introduction)
        formData.append('phoneNumber', this.phoneNumber)
        formData.append('level', this.level)
        formData.append('fieldOfWork[]', JSON.stringify(this.work))

        return callMemberSignUp(formData)
    }
}
export default SignUpStore
