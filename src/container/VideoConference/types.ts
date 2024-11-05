import { RefObject } from 'react'
import { SDP_TYPE } from '~/lib/types'

export interface PeerConnectionT {
    roomID: string
    localStream: MediaStream
    remoteVideoRef: RefObject<HTMLVideoElement>
}

export interface SendSDPT {
    type: SDP_TYPE
    roomID: string
}
export interface HangupT {
    roomID: string
    localStream: MediaStream
}
