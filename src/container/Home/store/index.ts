import { makeAutoObservable } from 'mobx'
class HomeStore {
    isAuth: boolean = false
    constructor() {
        makeAutoObservable(this)
    }
    checkIsAuth = () => {
        const token = localStorage.getItem('token')
        this.isAuth = !!token
    }
}
export default HomeStore
