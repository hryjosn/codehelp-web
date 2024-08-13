import { makeObservable } from 'mobx'
import SetUpStore from '~/container/SetUp/store/SetUpStore'
import SignUpStore from '~/container/SignUp/store/SignUpStore'
import LoginStore from '~/container/Login/store/LoginStore'

class RootStore {
    signUpStore = new SignUpStore()
    loginStore = new LoginStore()
    setUpStore = new SetUpStore()
    constructor() {
        makeObservable(this)
    }
}

const rootStore = new RootStore()
export default rootStore
