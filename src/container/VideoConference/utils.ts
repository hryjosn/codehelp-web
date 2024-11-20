import { PC_CONFIG } from './constant'
import {
    CreatePeerConnectionT,
    HangupT,
    SendAnswerSDP_T,
    SendOfferSDP_T,
} from './types'
import { runInAction } from 'mobx'
import rootStore from '~/store'

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
        if (peerConnection.iceConnectionState === 'disconnected') {
            console.log('有裝置斷線')

            removeConnectionMember(remoteId)
        }
    }

    runInAction(() => {
        videoConferenceStore.peerConnectionList[remoteId] = peerConnection
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
