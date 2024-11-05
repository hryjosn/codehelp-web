import { makeAutoObservable } from 'mobx'
class MentorProfileStore {
    avatar: string = ''
    name: string = ''
    company: string = ''
    title: string = ''

    constructor() {
        makeAutoObservable(this)
    }
}
export default MentorProfileStore
