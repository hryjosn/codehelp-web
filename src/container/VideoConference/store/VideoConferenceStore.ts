import { makeAutoObservable, runInAction } from 'mobx'
import * as io from 'socket.io-client'
import { ConfigurationT } from './types'

class VideoConferenceStore {
    localStream!: MediaStream | undefined
    remote!: MediaStream | null
    pcPeers!: RTCPeerConnection | undefined
    roomName: string = 'testRoom'
    configuration = {
        iceServers: [
            {
                urls: 'stun:stun.l.google.com:19302',
            },
            {
                urls: 'stun:stun.xten.com',
            },
        ],
    }

    constructor() {
        makeAutoObservable(this)
    }

    join = async (socket: io.Socket) => {
        socket.emit('join', this.roomName)
        this.createPeerConnection(socket)
    }

    hangup = (socket: io.Socket) => {
        runInAction(() => {
            this.pcPeers!.onicecandidate = null
            this.pcPeers!.onnegotiationneeded = null
            this.pcPeers!.close()
            this.pcPeers = undefined
            this.remote = null
        })
        socket.emit('hangup', this.roomName)
    }

    createPeerConnection = (socket: io.Socket) => {
        const peers: RTCPeerConnection = new RTCPeerConnection(
            this.configuration
        )
        runInAction(() => {
            this.pcPeers = peers
        })

        this.localStream?.getTracks().forEach((track) => {
            peers?.addTrack(track, this.localStream!)
        })
        console.log(this.localStream)

        peers.onicecandidate = (e) => {
            console.log('e.candidate ==> ', e.candidate)

            if (e.candidate) {
                socket.emit('ice_candidate', this.roomName, {
                    label: e.candidate.sdpMLineIndex,
                    id: e.candidate.sdpMid,
                    candidate: e.candidate.candidate,
                })
            }
        }

        peers.oniceconnectionstatechange = (e) => {
            const peerConnection = e.target as RTCPeerConnection
            if (peerConnection.iceConnectionState === 'disconnected') {
                this.hangup(socket)
            }
        }

        peers.ontrack = (event) => {
            const [stream] = event.streams
            runInAction(() => {
                this.remote = stream
            })
        }
    }

    createLocalStream = async () => {
        try {
            const constraints = { audio: true, video: true }
            const stream =
                await navigator.mediaDevices.getUserMedia(constraints)

            runInAction(() => {
                this.localStream = stream
            })
        } catch (err) {
            console.log('getUserMedia error: ', err)
        }
    }

    sendSDP = async (type: string, socket: io.Socket) => {
        try {
            if (!this.pcPeers) {
                console.log('尚未開啟視訊')
                return
            }

            if (type === 'offer') {
                this.createOffer()
            } else {
                this.createAnswer()
            }

            socket.emit(type, this.roomName, this.pcPeers?.localDescription)
        } catch (err) {
            console.log('error: ', err)
        }
    }

    createOffer = async () => {
        const localSDP = await this.pcPeers?.['createOffer']({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        })
        await this.pcPeers?.setLocalDescription(localSDP)
    }

    createAnswer = async () => {
        const localSDP = await this.pcPeers?.['createAnswer']({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        })
        await this.pcPeers?.setLocalDescription(localSDP)
    }
}
export default VideoConferenceStore
