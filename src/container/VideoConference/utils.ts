import { socket } from '~/lib/utils'
import { SDP_TYPE } from './types'
import { PC_CONFIG } from './constant'
import { RefObject } from 'react'

export let peerConnection: RTCPeerConnection
let localStream: MediaStream

export const getLocalMedia = async (): Promise<MediaStream> => {
    const constraints = { audio: true, video: true }
    localStream = await navigator.mediaDevices.getUserMedia(constraints)
    return localStream
}

export const setLocalSDP = async (type: SDP_TYPE) => {
    try {
        if (!peerConnection) {
            console.log('尚未開啟視訊')
            return
        }
        if (peerConnection.signalingState === 'closed') {
            console.log('signaling State is close')
        }

        const offerOptions = {
            offerToReceiveAudio: true, // 是否傳送聲音流給對方
            offerToReceiveVideo: true, // 是否傳送影像流給對方
        }
        // 建立 SDP
        const localSDP = await peerConnection[type](offerOptions)
        console.log('local SDP', localSDP)

        // 設定本地 SDP
        await peerConnection.setLocalDescription(localSDP)
        console.log('set local des', peerConnection.localDescription)
    } catch (err) {
        console.log('error: ', err)
    }
}

export const createPeerConnection = ({
    roomId,
    remoteVideoRef,
}: {
    roomId: string
    remoteVideoRef: RefObject<HTMLVideoElement>
}) => {
    console.log('create peer con')

    // 建立 RTCPeerConnection
    peerConnection = new RTCPeerConnection(PC_CONFIG)

    // 增加本地串流
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })

    peerConnection.onicecandidate = (e) => {
        if (e.candidate) {
            // 發送 ICE
            console.log('send ice')
            socket.emit('iceCandidate', roomId, {
                label: e.candidate.sdpMLineIndex,
                id: e.candidate.sdpMid,
                candidate: e.candidate.candidate,
            })
        }
    }

    // 監聽是否有媒體串流傳入
    peerConnection.ontrack = (e) => {
        if (remoteVideoRef.current) {
            console.log('set remote')
            remoteVideoRef.current.srcObject = e.streams[0]
        }
    }
}

export const hangUp = (roomId: string) => {
    if (socket.connected && peerConnection) {
        console.log('call hang up')

        peerConnection.close()
        socket.emit('leave', roomId)
        console.log(peerConnection)
    }
}
