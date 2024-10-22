import { makeAutoObservable } from 'mobx'
import { RefObject } from 'react'

class VideoConferenceStore {
    localVideo: RefObject<HTMLVideoElement> | null = null
    constructor() {
        makeAutoObservable(this)
    }
    setLocalVideo = (stream: MediaStream) => {
        if (this.localVideo?.current) {
            this.localVideo.current.srcObject = stream
        }
    }
}
export default VideoConferenceStore
