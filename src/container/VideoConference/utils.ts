import { socket } from '~/lib/utils'
import { SDP_TYPE } from './types'
import { PC_CONFIG } from './constant'

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

        const offerOptions = {
            offerToReceiveAudio: true, // 是否傳送聲音流給對方
            offerToReceiveVideo: true, // 是否傳送影像流給對方
        }
        // 建立 SDP
        const localSDP = await peerConnection[type](offerOptions)

        // 設定本地 SDP
        await peerConnection.setLocalDescription(localSDP)
    } catch (err) {
        console.log('error: ', err)
    }
}

export const createPeerConnection = () => {
    // 建立 RTCPeerConnection
    peerConnection = new RTCPeerConnection(PC_CONFIG)

    // 增加本地串流
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })
}
