import { makeObservable } from 'mobx'
import SignUpStore from '~/container/SignUp/store/SignUpStore'
import LoginStore from '~/container/Login/store/LoginStore'
import HomeStore from '~/container/Home/store'
import ChatStore from '~/container/Chat/store/ChatStore'

class RootStore {
    homeStore = new HomeStore()
    signUpStore = new SignUpStore()
    loginStore = new LoginStore()
    chatStore = new ChatStore()
    constructor() {
        makeObservable(this)
    }
}

const rootStore = new RootStore()
export default rootStore
