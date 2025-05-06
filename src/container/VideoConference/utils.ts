import Decimal from 'decimal.js'
import { RefObject } from 'react'
import { PC_CONFIG } from './constant'
import { useVideoConferenceStore } from './store/VideoConferenceStore'
import {
    CONNECTION_QUALITY,
    CreatePeerConnectionT,
    HangupT,
    ICE_CONNECTION_STATE,
    IConnectionQuality,
    MAX_BITRATE,
    ReplaceStreamTracks,
    REPORT_TYPE,
    SendAnswerSDP_T,
    SendOfferSDP_T,
} from './types'

// export let peerConnection: RTCPeerConnection
let connectionQualityInterval: NodeJS.Timeout | null = null

const {
    removeConnectionMember,
    clearPeerConnections,
    addPeer,
    setIsLocalShareScreen,
} = useVideoConferenceStore.getState()
const offerAndAnswerOptions = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
}

export const createLocalStream = async () => {
    try {
        const isWebcamOpen = useVideoConferenceStore.getState().isWebcamOpen

        const localStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        })

        const videoTrack = localStream.getVideoTracks()[0]
        if (videoTrack) {
            videoTrack.enabled = isWebcamOpen
        }
        return { localStream }
    } catch (err) {
        return { errMsg: err }
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
        if (
            (state === ICE_CONNECTION_STATE.CONNECTED ||
                state === ICE_CONNECTION_STATE.COMPLETED) &&
            !connectionQualityInterval
        ) {
            connectionQualityInterval = setInterval(async () => {
                const connectionQuality =
                    await checkConnectionQuality(peerConnection)
                if (connectionQuality) {
                    const maxBitrate = getMaxBitrate(connectionQuality)
                    await adjustMaxBitrate(peerConnection, maxBitrate)
                }
            }, 1000)
        }
    }
    addPeer({ remoteId, peerConnection })

    return peerConnection
}

export const hangup = async ({
    roomId,
    localStream,
    remoteId,
    socket,
    localVideoRef,
}: HangupT) => {
    const { peerConnectionList } = useVideoConferenceStore.getState()
    if (peerConnectionList) {
        clearPeerConnections()
        clearCurrentVideo(localVideoRef)
        setIsLocalShareScreen(false)
    }

    localStream.getTracks().forEach((track) => {
        track.stop()
    })

    if (connectionQualityInterval) {
        clearInterval(connectionQualityInterval)
        connectionQualityInterval = null
    }

    socket.emit('hangup', roomId, remoteId)
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

const adjustMaxBitrate = async (
    peerConnection: RTCPeerConnection,
    maxBitrate: number
) => {
    try {
        const sender: RTCRtpSender | undefined = peerConnection
            .getSenders()
            .find((sender) => sender.track?.kind === 'video')

        if (sender) {
            const params = sender.getParameters()
            if (params.encodings.length) {
                params.encodings[0].maxBitrate = maxBitrate
                sender.setParameters(params)
            }
        } else {
            console.log('local video stream is not found.')
        }
    } catch (error) {
        console.log('error', error)
    }
}

const checkConnectionQuality = async (
    peerConnection: RTCPeerConnection
): Promise<IConnectionQuality> => {
    const stats: RTCStatsReport = await peerConnection.getStats()
    let highestPacketLoss = 0
    let highestJitter = 0
    stats.forEach((report) => {
        if (report.type === REPORT_TYPE.INBOUND_RTP) {
            const packetLoss =
                new Decimal(report.packetsLost)
                    .div(report.packetsReceived + report.packetsLost)
                    .toFixed(2) || 0
            const jitter = report.jitter || 0

            if (
                Number(packetLoss) > highestPacketLoss ||
                jitter > highestJitter
            ) {
                highestPacketLoss = Number(packetLoss)
                highestJitter = jitter
            }
        }
    })

    return {
        highestPacketLoss,
        highestJitter,
    }
}

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
    paramId: string
) => {
    try {
        const videoStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
        })

        const micStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        })

        const newMicTrack = applyMicState(micStream)
        console.log()

        const combinedStream = new MediaStream([
            ...videoStream.getVideoTracks(),
            newMicTrack,
        ])

        clearCurrentVideo(localVideoRef)

        if (localVideoRef.current) {
            localVideoRef.current.srcObject = combinedStream
        }

        replaceStreamTracks({
            stream: combinedStream,
            isReplaceAudio: true,
            isReplaceVideo: true,
        })

        videoStream.getVideoTracks()[0].onended = () => {
            stopShareScreen({ localVideoRef, paramId })
        }
        setIsLocalShareScreen(true)
    } catch (err) {
        console.log(err)
        setIsLocalShareScreen(false)
    }
}

export const stopShareScreen = async ({
    localVideoRef,
    paramId,
}: {
    localVideoRef: RefObject<HTMLVideoElement>
    paramId: string
}) => {
    try {
        const { localStream } = await createLocalStream()

        clearCurrentVideo(localVideoRef)

        if (localStream) {
            applyMicState(localStream)

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = localStream
            }

            replaceStreamTracks({
                stream: localStream,
                isReplaceAudio: true,
                isReplaceVideo: true,
            })
        }
        setIsLocalShareScreen(false)
        const { socket } = useVideoConferenceStore.getState()

        socket?.emit('remoteStopShare', paramId, socket?.id!)
    } catch (err) {
        console.log(err)
        setIsLocalShareScreen(false)
    }
}

const clearCurrentVideo = (localVideoRef: RefObject<HTMLVideoElement>) => {
    const currentStream = localVideoRef.current?.srcObject as MediaStream
    if (!currentStream) return

    currentStream.getTracks().forEach((track) => track.stop())

    localVideoRef.current!.srcObject = null
}

export const replaceStreamTracks = ({
    stream,
    isReplaceVideo = true,
    isReplaceAudio = true,
}: ReplaceStreamTracks) => {
    const { peerConnectionList } = useVideoConferenceStore.getState()

    Object.values(peerConnectionList).forEach(({ peerConnection }) => {
        const senders = peerConnection.getSenders()

        if (isReplaceVideo) {
            const videoTrack = stream.getVideoTracks()[0]
            const videoSender = senders.find((s) => s.track?.kind === 'video')
            if (videoSender && videoTrack) {
                videoSender.replaceTrack(videoTrack)
            }
        }

        if (isReplaceAudio) {
            const audioTrack = stream.getAudioTracks()[0]
            const audioSender = senders.find((s) => s.track?.kind === 'audio')
            if (audioSender && audioTrack) {
                audioSender.replaceTrack(audioTrack)
            }
        }
    })
}

export const applyMicState = (stream: MediaStream) => {
    const isMicOpen = useVideoConferenceStore.getState().isMicOpen
    const audioTrack = stream.getAudioTracks()[0]
    if (audioTrack) audioTrack.enabled = isMicOpen

    return audioTrack
}
