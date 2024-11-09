import { SDP_TYPE } from '~/lib/types'
import { PC_CONFIG } from './constant'
import { PeerConnectionT, SendSDPT } from './types'
import { socket } from '~/lib/utils'
import { RefObject } from 'react'

export let peerConnection: RTCPeerConnection

export const createLocalStream = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        })
        return stream
    } catch (err) {
        console.log('getUserMedia error: ', err)
    }
}

export const createPeerConnection = ({
    roomID,
    localStream,
    remoteVideoRef,
}: PeerConnectionT) => {
    peerConnection = new RTCPeerConnection(PC_CONFIG)

    localStream?.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })

    peerConnection.onicecandidate = (e) => {
        if (e.candidate) {
            socket?.emit('ice_candidate', roomID, {
                label: e.candidate.sdpMLineIndex,
                id: e.candidate.sdpMid,
                candidate: e.candidate.candidate,
            })
        }
    }

    peerConnection.oniceconnectionstatechange = (e) => {
        const peerConnection = e.target as RTCPeerConnection
        if (peerConnection.iceConnectionState === 'disconnected') {
            hangup(roomID)
        }
    }

    peerConnection.ontrack = (event) => {
        if (remoteVideoRef.current) {
            const [stream] = event.streams
            remoteVideoRef.current.srcObject = stream
        }
    }
}

export const sendSDP = async ({ type, roomID }: SendSDPT) => {
    try {
        if (!peerConnection) {
            console.log('尚未開啟視訊')
            return
        }

        const method = type === SDP_TYPE.OFFER ? 'createOffer' : 'createAnswer'

        const localSDP = await peerConnection?.[method]({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        })
        await peerConnection?.setLocalDescription(localSDP)
        socket?.emit(type, roomID, peerConnection.localDescription!)
    } catch (err) {
        console.log('error: ', err)
    }
}

export const hangup = (roomID: string) => {
    if (peerConnection) {
        peerConnection.onicecandidate = null
        peerConnection.onnegotiationneeded = null
        peerConnection?.close()
    }

    socket?.emit('hangup', roomID)
}

export const shareScreen = async (
    localVideoRef: RefObject<HTMLVideoElement>
) => {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
        })

        clearCurrentVideo(localVideoRef)

        if (mediaStream) changeVideoTrack(localVideoRef, mediaStream)
    } catch (err) {
        console.log(err)
    }
}

export const stopShareScreen = async (
    localVideoRef: RefObject<HTMLVideoElement>
) => {
    try {
        const localStream = await createLocalStream()

        clearCurrentVideo(localVideoRef)

        if (localStream) changeVideoTrack(localVideoRef, localStream)
    } catch (err) {
        console.log(err)
    }
}

const clearCurrentVideo = (localVideoRef: RefObject<HTMLVideoElement>) => {
    const currentStream = localVideoRef.current?.srcObject as MediaStream

    currentStream
        .getTracks()
        .find((track) => track.kind === 'video')
        ?.stop()
}

const changeVideoTrack = (
    localVideoRef: RefObject<HTMLVideoElement>,
    localStream: MediaStream
) => {
    if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream
    }
    const videoSender = peerConnection
        .getSenders()
        .find((sender) => sender.track!.kind === 'video')
    if (videoSender) {
        videoSender.replaceTrack(localStream!.getVideoTracks()[0])
    }
}
