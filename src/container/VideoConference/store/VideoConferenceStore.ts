import { makeAutoObservable } from 'mobx'

class VideoConferenceStore {
    localStream: MediaStream | undefined
    constructor() {
        makeAutoObservable(this)
    }
}
export default VideoConferenceStore
