export enum SDP_TYPE {
    OFFER = 'offer',
    ANSWER = 'answer',
}

export interface Ice_candidateT {
    label: number | null
    id: string | null
    candidate: string
}

export interface MessageData {
    id: string
    user: {
        id: string
        userName: string
        avatar: string
    }
    roomId: string
    content: string
    createdAt: string
    type: number
}

export interface ServerToClientEvents {
    otherUserHangup: () => void
    remoteStartShare: (remoteId: string) => void
    remoteStopShare: (remoteId: string) => void
    offer: (description: RTCSessionDescription, remoteId: string) => void
    answer: (description: RTCSessionDescription, remoteId: string) => void
    ice_candidate: (data: Ice_candidateT, remoteId: string) => void
    ready: (socketId: string, members: string[]) => void
    leave: (remoteId: string) => void
    receiveMessage: (messageData: MessageData) => void
}
export interface ClientToServerEvents {
    remoteStartShare: (roomID: string, remoteId: string) => void
    remoteStopShare: (roomID: string, remoteId: string) => void
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
    sendMessage: (messageData: MessageData) => void
}
