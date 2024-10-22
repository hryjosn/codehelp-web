interface ServerToClientEvents {
    ready: (msg: string) => void
    offer: (desc: RTCSessionDescriptionInit) => void
    answer: (desc: RTCSessionDescriptionInit) => void
    ice_candidate: (data: any) => void
}

interface ClientToServerEvents {
    join: (room: string) => void
    offer: (room: string, sdp: RTCSessionDescriptionInit) => void
    answer: (room: string, sdp: RTCSessionDescriptionInit) => void
    ice_candidate: (room: string, data: any) => void
    hangup: (room: string) => void
}
