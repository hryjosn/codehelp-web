import { MutableRefObject, RefObject } from 'react'
import { Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '~/lib/types'
export interface CreatePeerConnectionT {
    localStreamRef: MutableRefObject<MediaStream | undefined>
    remoteId: string
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
}

export interface PeerConnectionListT {
    [remoteId: string]: {
        peerConnection: RTCPeerConnection
        isScreenSharing: boolean
    }
}

export interface HangupT {
    roomId: string
    localStreamRef: MutableRefObject<MediaStream | undefined>
    remoteId: string
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
    localVideoRef: RefObject<HTMLVideoElement>
}
export interface SendOfferSDP_T {
    localStreamRef: MutableRefObject<MediaStream | undefined>
    remoteId: string
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
}
export interface SendAnswerSDP_T {
    localStreamRef: MutableRefObject<MediaStream | undefined>
    remoteId: string
    desc: RTCSessionDescription
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
}

export enum ICE_CONNECTION_STATE {
    CONNECTED = 'connected',
    COMPLETED = 'completed',
    FAILED = 'failed',
    DISCONNECTED = 'disconnected',
}

export enum CONNECTION_QUALITY {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export const MAX_BITRATE = {
    [CONNECTION_QUALITY.LOW]: 300 * 1000,
    [CONNECTION_QUALITY.MEDIUM]: 500 * 1000,
    [CONNECTION_QUALITY.HIGH]: 1000 * 1000,
}

export interface IConnectionQuality {
    highestPacketLoss: number
    highestJitter: number
}

export enum REPORT_TYPE {
    INBOUND_RTP = 'inbound-rtp',
    CANDIDATE_PAIR = 'candidate-pair',
}

export interface ReplaceStreamTracksParams {
    stream: MediaStream
    isReplaceVideo?: boolean
    isReplaceAudio?: boolean
}
export interface StopShareScreenParams {
    localStreamRef: MutableRefObject<MediaStream | undefined>
    localVideoRef: RefObject<HTMLVideoElement>
    paramId: string
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
}
export interface ShareScreenParams {
    localStreamRef: MutableRefObject<MediaStream | undefined>
    localVideoRef: RefObject<HTMLVideoElement>
    paramId: string
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
}
