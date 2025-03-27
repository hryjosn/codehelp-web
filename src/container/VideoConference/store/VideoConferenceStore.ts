import { create } from 'zustand'
import { PeerConnectionListT } from '../types'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '~/lib/types'

type States = {
    localStream: MediaStream | undefined
    peerConnectionList: PeerConnectionListT
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
}

type Actions = {
    connectSocket: () => void
    addIceCandidate: ({
        remoteId,
        candidate,
    }: {
        remoteId: string
        candidate: RTCIceCandidate
    }) => void
    setRemoteDescription: ({
        remoteId,
        desc,
    }: {
        remoteId: string
        desc: RTCSessionDescription
    }) => void
    addPeer: ({
        remoteId,
        peerConnection,
    }: {
        remoteId: string
        peerConnection: RTCPeerConnection
    }) => void
    clearPeerConnections: () => void
    removeConnectionMember: (remoteId: string) => void
    setLocalStream: (localStream: MediaStream | undefined) => void
}

export type VideoConferenceStore = States & Actions

export const useVideoConferenceStore = create<States & Actions>()((set) => ({
    localStream: undefined,
    peerConnectionList: {},
    socket: null,
    setLocalStream: (localStream) => set({ localStream }),

    addIceCandidate: ({ remoteId, candidate }) =>
        set((state) => {
            const peerData = state.peerConnectionList[remoteId]
            if (peerData) {
                peerData.peerConnection.addIceCandidate(candidate)
            }
            return state
        }),

    setRemoteDescription: ({ remoteId, desc }) =>
        set((state) => {
            const peerData = state.peerConnectionList[remoteId]
            if (peerData) {
                peerData.peerConnection.setRemoteDescription(desc)
            }
            return state
        }),

    clearPeerConnections: () =>
        set({
            peerConnectionList: {},
        }),

    addPeer: ({ remoteId, peerConnection }) =>
        set((state) => ({
            peerConnectionList: {
                ...state.peerConnectionList,
                [remoteId]: { peerConnection, isScreenSharing: false },
            },
        })),

    connectSocket: () => {
        set({ socket: io(process.env.NEXT_PUBLIC_API_URL) })
    },

    removeConnectionMember: (remoteId) => {
        set((state) => {
            const peerData = state.peerConnectionList[remoteId]

            if (peerData) {
                peerData.peerConnection.onicecandidate = null
                peerData.peerConnection.onnegotiationneeded = null
                peerData.peerConnection.oniceconnectionstatechange = null

                peerData.peerConnection.close()

                const updatedList = { ...state.peerConnectionList }
                delete updatedList[remoteId]

                return { peerConnectionList: updatedList }
            }

            return state
        })
    },
}))
