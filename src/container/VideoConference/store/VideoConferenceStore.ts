import { makeAutoObservable } from 'mobx'
import { PeerConnectionListT } from '../types'

class VideoConferenceStore {
    localStream: MediaStream | undefined
    peerConnectionList: PeerConnectionListT = {}

    constructor() {
        makeAutoObservable(this)
    }
}
export default VideoConferenceStore
