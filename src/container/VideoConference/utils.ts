import { PC_CONFIG } from './constant'
import { Dispatch, RefObject, SetStateAction } from 'react'
import {
    HangupT,
    ICE_CONNECTION_STATE,
    CONNECTION_QUALITY,
    MAX_BITRATE,
    IConnectionQuality,
    REPORT_TYPE,
    CreatePeerConnectionT,
    SendAnswerSDP_T,
    SendOfferSDP_T,
} from './types'
import Decimal from 'decimal.js'
import { runInAction } from 'mobx'
import rootStore from '~/store'

// export let peerConnection: RTCPeerConnection
let connectionQualityInterval: NodeJS.Timeout | null = null

const { videoConferenceStore } = rootStore
const { removeConnectionMember } = videoConferenceStore
const offerAndAnswerOptions = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
}

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

export const createPeerConnection = async ({
    localStream,
    remoteId,
    socket,
}: CreatePeerConnectionT) => {
    const peerConnection = new RTCPeerConnection(PC_CONFIG)

    localStream?.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })

    peerConnection.onicecandidate = (e) => {
        if (e.candidate && socket.id) {
            socket.emit(
                'ice_candidate',
                {
                    label: e.candidate.sdpMLineIndex,
                    id: e.candidate.sdpMid,
                    candidate: e.candidate.candidate,
                },
                socket.id,
                remoteId
            )
        }
    }

    peerConnection.oniceconnectionstatechange = (e) => {
        const peerConnection = e.target as RTCPeerConnection
        const state = peerConnection.iceConnectionState
        if (
            state === ICE_CONNECTION_STATE.DISCONNECTED ||
            state === ICE_CONNECTION_STATE.FAILED
        ) {
            console.log('other user is disconnected')
            if (connectionQualityInterval) {
                clearInterval(connectionQualityInterval)
                connectionQualityInterval = null
            }
            removeConnectionMember(remoteId)
        }
        // if (
        //     (state === ICE_CONNECTION_STATE.CONNECTED ||
        //         state === ICE_CONNECTION_STATE.COMPLETED) &&
        //     !connectionQualityInterval
        // ) {
        //     connectionQualityInterval = setInterval(async () => {
        //         const connectionQuality = await checkConnectionQuality()
        //         if (connectionQuality) {
        //             const maxBitrate = getMaxBitrate(connectionQuality)
        //             await adjustMaxBitrate(localStream, maxBitrate)
        //         }
        //     }, 1000)
        // }
    }

    runInAction(() => {
        videoConferenceStore.peerConnectionList[remoteId] = {
            peerConnection,
            isScreenSharing: false,
        }
    })

    return peerConnection
}

export const hangup = ({ roomId, localStream, remoteId, socket }: HangupT) => {
    if (videoConferenceStore.peerConnectionList) {
        runInAction(() => {
            videoConferenceStore.peerConnectionList = {}
        })
    }

    localStream.getTracks().forEach((track) => {
        track.stop()
    })

    if (connectionQualityInterval) {
        clearInterval(connectionQualityInterval)
        connectionQualityInterval = null
    }

    socket?.emit('hangup', roomId, remoteId)
}

export const sendOfferSDP = async ({
    localStream,
    remoteId,
    socket,
}: SendOfferSDP_T) => {
    const peerConnection = await createPeerConnection({
        localStream,
        remoteId,
        socket,
    })

    const localSDP = await peerConnection.createOffer(offerAndAnswerOptions)

    await peerConnection.setLocalDescription(localSDP)
    if (peerConnection.localDescription && socket.id) {
        socket.emit(
            'offer',
            peerConnection.localDescription,
            socket.id,
            remoteId
        )
    }
}

export const sendAnswerSDP = async ({
    localStream,
    remoteId,
    desc,
    socket,
}: SendAnswerSDP_T) => {
    const peerConnection = await createPeerConnection({
        localStream,
        remoteId,
        socket,
    })

    await peerConnection.setRemoteDescription(desc)

    const localSDP = await peerConnection.createAnswer(offerAndAnswerOptions)

    await peerConnection.setLocalDescription(localSDP)

    if (peerConnection.localDescription && socket.id) {
        socket.emit(
            'answer',
            peerConnection.localDescription,
            socket.id,
            remoteId
        )
    }
}

// const adjustMaxBitrate = async (
//     localStream: MediaStream,
//     maxBitrate: number
// ) => {
//     try {
//         const videoTrack = localStream.getVideoTracks()[0]
//         const sender: RTCRtpSender | undefined = peerConnection
//             .getSenders()
//             .find((sender) => sender.track === videoTrack)

//         if (sender) {
//             const params = sender.getParameters()
//             params.encodings[0].maxBitrate = maxBitrate
//             sender.setParameters(params)
//         } else {
//             console.log('local video stream is not found.')
//         }
//     } catch (error) {
//         console.log('error', error)
//     }
// }

// const checkConnectionQuality = async (): Promise<IConnectionQuality> => {
//     const stats: RTCStatsReport = await peerConnection.getStats()
//     let highestPacketLoss = 0
//     let highestJitter = 0

//     stats.forEach((report) => {
//         if (report.type === REPORT_TYPE.INBOUND_RTP) {
//             const packetLoss =
//                 new Decimal(report.packetsLost)
//                     .div(report.packetsReceived + report.packetsLost)
//                     .toFixed(2) || 0
//             const jitter = report.jitter || 0

//             if (
//                 Number(packetLoss) > highestPacketLoss ||
//                 jitter > highestJitter
//             ) {
//                 highestPacketLoss = Number(packetLoss)
//                 highestJitter = jitter
//             }
//         }
//     })

//     return {
//         highestPacketLoss,
//         highestJitter,
//     }
// }

const getMaxBitrate = ({
    highestPacketLoss,
    highestJitter,
}: IConnectionQuality): number => {
    if (highestPacketLoss > 0.1 || highestJitter > 0.05) {
        return MAX_BITRATE[CONNECTION_QUALITY.LOW] // 糟糕的網絡，降低品質
    } else if (highestPacketLoss > 0.05 || highestJitter > 0.03) {
        return MAX_BITRATE[CONNECTION_QUALITY.MEDIUM] // 中等品質
    } else {
        return MAX_BITRATE[CONNECTION_QUALITY.HIGH] // 良好的網絡，保持高品質
    }
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

    Object.values(videoConferenceStore.peerConnectionList).map(
        (peerConnection) => {
            const videoSender = peerConnection.peerConnection
                .getSenders()
                .find((sender) => sender.track!.kind === 'video')
            if (videoSender) {
                videoSender.replaceTrack(localStream!.getVideoTracks()[0])
            }
        }
    )
}
