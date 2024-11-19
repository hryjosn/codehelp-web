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
