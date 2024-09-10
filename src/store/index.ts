import { makeObservable } from 'mobx'
import SignUpStore from '~/container/SignUp/store/SignUpStore'
import LoginStore from '~/container/Login/store/LoginStore'

class RootStore {
    signUpStore = new SignUpStore()
    loginStore = new LoginStore()
    constructor() {
        makeObservable(this)
    }
}

const rootStore = new RootStore()
export default rootStore
