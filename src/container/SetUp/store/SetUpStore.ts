import { makeAutoObservable } from 'mobx'

class SetUpStore {
    userName: string = ''
    gender: string = ''
    country: string = ''
    title: string = ''
    company: string = ''
    experience: experienceT = { years: '', months: '' }
    linkedIn: string = ''
    work: string = ''
    level: string = ''
    story: string = ''
    expertise: string[] = []
    disciplines: string[] = []
    skills: string[] = []
    tools: string[] = []

    constructor() {
        makeAutoObservable(this)
    }
}
export default SetUpStore
