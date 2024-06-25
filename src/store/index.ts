import { makeObservable } from 'mobx'
import SignUpStore from '~/container/SignUp/store/SignUpStore'
class RootStore {
    SignUp = new SignUpStore()
    constructor() {
        makeObservable(this)
    }
}

const rootStore = new RootStore()
export default rootStore
