import { makeObservable } from 'mobx'
import ChatStore from '~/container/Chat/store/ChatStore'
import HomeStore from '~/container/Home/store'
import LoginStore from '~/container/Login/store/LoginStore'
import SignUpStore from '~/container/SignUp/store/SignUpStore'

import MentorProfileStore from '~/container/MentorProfile/store/MentorProfileStore'
import VideoConferenceStore from '~/container/VideoConference/store/VideoConferenceStore'
class RootStore {
    homeStore = new HomeStore()
    signUpStore = new SignUpStore()
    loginStore = new LoginStore()
    chatStore = new ChatStore()
    mentorProfileStore = new MentorProfileStore()
    videoConferenceStore = new VideoConferenceStore()
    constructor() {
        makeObservable(this)
    }
}

const rootStore = new RootStore()
export default rootStore
