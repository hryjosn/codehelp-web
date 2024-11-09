export enum SDP_TYPE {
    OFFER = 'offer',
    ANSWER = 'answer',
}

export interface Ice_candidateT {
    label: number | null
    id: string | null
    candidate: string
}

export interface ServerToClientEvents {
    offer: (description: RTCSessionDescription) => void
    answer: (description: RTCSessionDescription) => void
    ice_candidate: (data: Ice_candidateT) => void
    ready: () => void
    otherUserHangup: () => void
    remoteStartShare: (isScreenSharing: boolean) => void
    remoteStopShare: (isScreenSharing: boolean) => void
}

export interface ClientToServerEvents {
    join: (roomID: string) => void
    answer: (roomID: string, description: RTCSessionDescription) => void
    ice_candidate: (room: string, data: Ice_candidateT) => void
    hangup: (roomID: string) => void
    offer: (room: string, description: RTCSessionDescription) => void
    remoteStartShare: (roomID: string, isScreenSharing: boolean) => void
    remoteStopShare: (roomID: string, isScreenSharing: boolean) => void
}
