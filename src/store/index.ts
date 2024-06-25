import { makeObservable } from 'mobx'
import LoginStore from '~/container/Login/store/LoginStore'
import SignUpStore from '~/container/SignUp/store/SignUpStore'
class RootStore {
    signUpStore = new SignUpStore()
    loginStore = new LoginStore()
    constructor() {
        makeObservable(this)
    }
}

const rootStore = new RootStore()
export default rootStore
