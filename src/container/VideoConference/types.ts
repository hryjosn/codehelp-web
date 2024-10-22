export enum SDP_TYPE {
    OFFER = 'createOffer',
    ANSWER = 'createAnswer',
}

interface IceCandidateData {
    label: number | null
    id: string | null
    candidate: string
}

export interface ClientToServerEvents {
    join: (roomId: string) => void
    offer: (roomId: string, desc: RTCSessionDescription) => void
    answer: (roomId: string, desc: RTCSessionDescription) => void
    iceCandidate: (roomId: string, data: IceCandidateData) => void
    leave: (roomId: string) => void
}

export interface ServerToClientEvents {
    ready: (message: string) => void
    offer: (desc: RTCSessionDescription) => void
    answer: (desc: RTCSessionDescription) => void
    iceCandidate: (data: IceCandidateData) => void
}
