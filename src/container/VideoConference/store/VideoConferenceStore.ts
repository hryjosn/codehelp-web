import { create } from 'zustand'
import { PeerConnectionListT } from '../types'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '~/lib/types'
import { MessageData } from '~/lib/types'

type States = {
    peerConnectionList: PeerConnectionListT
    chatList: MessageData[]
    isLocalShareScreen: boolean
    isMicOpen: boolean
    isWebcamOpen: boolean
}

type Actions = {
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
    registerShareScreenSocketEvents: (
        socket: Socket<ServerToClientEvents, ClientToServerEvents>
    ) => void
    setIsMicOpen: (isOpen: boolean) => void
    setIsWebcamOpen: (isOpen: boolean) => void
}

export type VideoConferenceStore = States & Actions

export const useVideoConferenceStore = create<States & Actions>()(
    (set, get) => ({
        peerConnectionList: {},
        socket: null,
        chatList: [],
        isLocalShareScreen: false,
        isMicOpen: true,
        isWebcamOpen: true,

        addIceCandidate: ({ remoteId, candidate }) =>
            set((state) => {
                const peerData = state?.peerConnectionList[remoteId]
                if (peerData) {
                    peerData.peerConnection.addIceCandidate(candidate)
                }
                return state
            }),

        setRemoteDescription: ({ remoteId, desc }) =>
            set((state) => {
                const peerData = state?.peerConnectionList[remoteId]
                if (peerData) {
                    peerData.peerConnection.setRemoteDescription(desc)
                }
                return state
            }),

        clearPeerConnections: () => {
            const { peerConnectionList } = get()
            if (!peerConnectionList) return

            Object.values(peerConnectionList).forEach(({ peerConnection }) => {
                try {
                    peerConnection.close()
                } catch (err) {
                    console.warn('Failed to close peerConnection', err)
                }
            })
            set({ peerConnectionList: {} })
        },

        addPeer: ({ remoteId, peerConnection }) =>
            set((state) => ({
                peerConnectionList: {
                    ...state.peerConnectionList,
                    [remoteId]: { peerConnection, isScreenSharing: false },
                },
            })),

        removeConnectionMember: (remoteId) => {
            set((state) => {
                const peerData = state?.peerConnectionList[remoteId]

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
                const existing = state?.peerConnectionList[remoteId]

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

        registerShareScreenSocketEvents: (socket) => {
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
