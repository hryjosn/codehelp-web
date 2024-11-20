import { Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '~/lib/types'
export interface CreatePeerConnectionT {
    localStream: MediaStream
    remoteId: string
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
}

export interface PeerConnectionListT {
    [remoteId: string]: RTCPeerConnection
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
