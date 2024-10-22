import { makeObservable } from 'mobx'
import SignUpStore from '~/container/SignUp/store/SignUpStore'
import LoginStore from '~/container/Login/store/LoginStore'
import HomeStore from '~/container/Home/store'
import VideoConferenceStore from '~/container/VideoConference/store'

class RootStore {
    homeStore = new HomeStore()
    signUpStore = new SignUpStore()
    loginStore = new LoginStore()
    videoConferenceStore = new VideoConferenceStore()
    constructor() {
        makeObservable(this)
    }
}

const rootStore = new RootStore()
export default rootStore
