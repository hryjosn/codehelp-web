import { makeObservable } from 'mobx'
import SetUpStore from '~/container/SetUp/store/SetUpStore'
import SignUpStore from '~/container/SignUp/store/SignUpStore'
class RootStore {
    signUpStore = new SignUpStore()
    setUpStore = new SetUpStore()
    constructor() {
        makeObservable(this)
    }
}

const rootStore = new RootStore()
export default rootStore
