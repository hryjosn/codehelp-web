export interface CreatePeerConnectionT {
    localStream: MediaStream
    remoteId: string
}

export interface PeerConnectionListT {
    [remoteId: string]: RTCPeerConnection
}

export interface HangupT {
    roomId: string
    localStream: MediaStream
    remoteId: string
}
export interface SendOfferSDP_T {
    localStream: MediaStream
    remoteId: string
}
export interface SendAnswerSDP_T {
    localStream: MediaStream
    remoteId: string
    desc: RTCSessionDescription
}
