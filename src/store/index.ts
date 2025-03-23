import { makeObservable } from 'mobx'

import VideoConferenceStore from '~/container/VideoConference/store/VideoConferenceStore'
class RootStore {
    videoConferenceStore = new VideoConferenceStore()
    constructor() {
        makeObservable(this)
    }
}

const rootStore = new RootStore()
export default rootStore
