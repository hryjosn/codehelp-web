import { makeAutoObservable, runInAction } from 'mobx'
import { PeerConnectionListT } from '../types'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '~/lib/types'

class VideoConferenceStore {
    localStream: MediaStream | undefined
    peerConnectionList: PeerConnectionListT = {}
    socket!: Socket<ServerToClientEvents, ClientToServerEvents>

    constructor() {
        makeAutoObservable(this)
    }

    connectSocket = () => {
        runInAction(() => {
            this.socket = io(process.env.NEXT_PUBLIC_API_URL)
        })
    }

    removeConnectionMember = (remoteId: string) => {
        if (this.peerConnectionList[remoteId]) {
            runInAction(() => {
                this.peerConnectionList[
                    remoteId
                ].peerConnection.onicecandidate = null
                this.peerConnectionList[
                    remoteId
                ].peerConnection.onnegotiationneeded = null
                this.peerConnectionList[
                    remoteId
                ].peerConnection.oniceconnectionstatechange = null

                this.peerConnectionList[remoteId].peerConnection.close()
                delete this.peerConnectionList[remoteId]
            })
        }
    }
}
export default VideoConferenceStore
