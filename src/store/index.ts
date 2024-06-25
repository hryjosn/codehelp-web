import { makeObservable } from 'mobx'
import LoginStore from '~/container/Login/store/LoginStore'
import SignUpStore from '~/container/SignUp/store/SignUpStore'
class RootStore {
    SignUp = new SignUpStore()
    Login = new LoginStore()
    constructor() {
        makeObservable(this)
    }
}

const rootStore = new RootStore()
export default rootStore
