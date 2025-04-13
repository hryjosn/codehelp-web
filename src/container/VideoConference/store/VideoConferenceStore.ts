import { create } from 'zustand'
import { PeerConnectionListT } from '../types'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '~/lib/types'
import { MessageData } from '~/lib/types'

type States = {
    localStream: MediaStream | undefined
    peerConnectionList: PeerConnectionListT
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
    chatList: MessageData[]
    isLocalShareScreen: boolean
    isMicOpen: boolean
    isWebcamOpen: boolean
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
    addMessage: (newMessage: MessageData) => void
    resetChatList: () => void
    setIsLocalShareScreen: (isShare: boolean) => void
    updatePeerIsScreenSharing: ({
        remoteId,
        isSharing,
    }: {
        remoteId: string
        isSharing: boolean
    }) => void
    registerShareScreenSocketEvents: () => void
    setIsMicOpen: (isOpen: boolean) => void
    setIsWebcamOpen: (isOpen: boolean) => void
}

export type VideoConferenceStore = States & Actions

export const useVideoConferenceStore = create<States & Actions>()(
    (set, get) => ({
        localStream: undefined,
        peerConnectionList: {},
        socket: null,
        chatList: [],
        isLocalShareScreen: false,
        isMicOpen: true,
        isWebcamOpen: true,
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

        updatePeerIsScreenSharing: ({ remoteId, isSharing }) =>
            set((state) => {
                const existing = state.peerConnectionList[remoteId]

                if (!existing) return {}

                return {
                    peerConnectionList: {
                        ...state.peerConnectionList,
                        [remoteId]: {
                            ...existing,
                            isScreenSharing: isSharing,
                        },
                    },
                }
            }),

        addMessage: (newMessage) =>
            set((state) => ({
                chatList: [
                    {
                        id: newMessage.id,
                        user: newMessage.user,
                        content: newMessage.content,
                        createdAt: newMessage.createdAt,
                        roomId: newMessage.roomId,
                        type: newMessage.type,
                    },
                    ...state.chatList,
                ],
            })),
        resetChatList: () => set({ chatList: [] }),
        setIsLocalShareScreen: (isShare) =>
            set({ isLocalShareScreen: isShare }),

        registerShareScreenSocketEvents: () => {
            const { socket } = get()

            if (!socket) return

            socket.on('remoteStartShare', (remoteId) => {
                const { peerConnectionList, updatePeerIsScreenSharing } = get()

                if (peerConnectionList[remoteId]) {
                    updatePeerIsScreenSharing({ remoteId, isSharing: true })
                }
            })

            socket.on('remoteStopShare', (remoteId) => {
                const { peerConnectionList, updatePeerIsScreenSharing } = get()

                if (peerConnectionList[remoteId]) {
                    updatePeerIsScreenSharing({ remoteId, isSharing: false })
                }
            })
        },

        setIsMicOpen: (isOpen) => set({ isMicOpen: isOpen }),
        setIsWebcamOpen: (isOpen) => set({ isWebcamOpen: isOpen }),
    })
)
