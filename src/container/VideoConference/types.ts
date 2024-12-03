import { Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '~/lib/types'
export interface CreatePeerConnectionT {
    localStream: MediaStream
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
    localStream: MediaStream
    remoteId: string
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
}
export interface SendOfferSDP_T {
    localStream: MediaStream
    remoteId: string
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
}
export interface SendAnswerSDP_T {
    localStream: MediaStream
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
