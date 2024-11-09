import { SDP_TYPE } from '~/lib/types'
import { PC_CONFIG } from './constant'
import { PeerConnectionT, SendSDPT, HangupT } from './types'
import { socket } from '~/lib/utils'
import { Dispatch, RefObject, SetStateAction } from 'react'

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
            console.log('other user is disconnected')
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

export const hangup = ({ roomID, localStream }: HangupT) => {
    if (peerConnection) {
        peerConnection.onicecandidate = null
        peerConnection.onnegotiationneeded = null
        peerConnection?.close()
    }

    localStream.getTracks().forEach((track) => {
        track.stop()
    })

    socket?.emit('hangup', roomID)
}

export const shareScreen = async (
    localVideoRef: RefObject<HTMLVideoElement>,
    setIsLocalShareScreen: Dispatch<SetStateAction<boolean>>
) => {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
        })

        clearCurrentVideo(localVideoRef)

        if (mediaStream) changeVideoTrack(localVideoRef, mediaStream)
        mediaStream.getVideoTracks()[0].onended = () => {
            stopShareScreen(localVideoRef, setIsLocalShareScreen)
        }
        setIsLocalShareScreen(true)
    } catch (err) {
        console.log(err)
        setIsLocalShareScreen(false)
    }
}

export const stopShareScreen = async (
    localVideoRef: RefObject<HTMLVideoElement>,
    setIsLocalShareScreen: Dispatch<SetStateAction<boolean>>
) => {
    try {
        const localStream = await createLocalStream()

        clearCurrentVideo(localVideoRef)

        if (localStream) changeVideoTrack(localVideoRef, localStream)
        setIsLocalShareScreen(false)
    } catch (err) {
        console.log(err)
        setIsLocalShareScreen(false)
    }
}

const clearCurrentVideo = (localVideoRef: RefObject<HTMLVideoElement>) => {
    const currentStream = localVideoRef.current?.srcObject as MediaStream
    currentStream?.getVideoTracks().forEach((track) => track.stop())
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
