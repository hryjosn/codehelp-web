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
    otherUserHangup: () => void
    remoteStartShare: (isScreenSharing: boolean) => void
    remoteStopShare: (isScreenSharing: boolean) => void
    offer: (description: RTCSessionDescription, remoteId: string) => void
    answer: (description: RTCSessionDescription, remoteId: string) => void
    ice_candidate: (data: Ice_candidateT, remoteId: string) => void
    ready: (socketId: string, members: string[]) => void
    leave: (remoteId: string) => void
}
export interface ClientToServerEvents {
    remoteStartShare: (roomID: string, isScreenSharing: boolean) => void
    remoteStopShare: (roomID: string, isScreenSharing: boolean) => void
    join: (roomId: string) => void
    offer: (
        desc: RTCSessionDescription,
        remoteId: string,
        localId: string
    ) => void
    answer: (
        desc: RTCSessionDescription,
        remoteId: string,
        localId: string
    ) => void
    ice_candidate: (
        data: Ice_candidateT,
        remoteId: string,
        localId: string
    ) => void
    hangup: (room: string, remoteId: string) => void
}
