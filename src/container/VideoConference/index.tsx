'use client'
import { useEffect, useRef, useState } from 'react'
import MessageBox from './components/MessageBox'
import { IoMdMic, IoMdMicOff } from 'react-icons/io'
import { MdOutlineScreenShare } from 'react-icons/md'
import { ImPhoneHangUp } from 'react-icons/im'
import { IoSend } from 'react-icons/io5'
import { PiChatCircleText } from 'react-icons/pi'
import { io, Socket } from 'socket.io-client'

const VideoConference = () => {
    const [isMicOpen, setIsMicOpen] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const localMediaRef = useRef<HTMLVideoElement | null>(null)
    const remoteMediaRef = useRef<HTMLVideoElement | null>(null)

    let peerConnection: RTCPeerConnection | null = null
    let socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
        'localhost:80',
        {
            transports: ['websocket'],
        }
    )
    let localStream: MediaStream
    const room = 'room1'

    const socketConnect = () => {
        socket.emit('join', room)

        socket.on('ready', () => {
            sendSDP('offer')
        })

        socket.on('offer', async (desc) => {
            await peerConnection!.setRemoteDescription(desc)
            await sendSDP('answer')
        })

        socket.on('answer', (desc) => {
            peerConnection!.setRemoteDescription(desc)
        })

        socket.on('ice_candidate', (data) => {
            const candidate = new RTCIceCandidate({
                sdpMLineIndex: data.label,
                candidate: data.candidate,
            })
            peerConnection!.addIceCandidate(candidate)
        })
    }

    const createStream = () => {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: true,
            })
            .then((stream) => {
                if (localMediaRef.current) {
                    localMediaRef.current.srcObject = stream
                }
                localStream = stream
                call()
            })
            .catch((error) => {
                throw error
            })
    }

    const sendSDP = async (type: 'offer' | 'answer') => {
        try {
            if (!peerConnection) {
                console.log('尚未開啟視訊')
                return
            }

            const method = type === 'offer' ? 'createOffer' : 'createAnswer'
            const offerOptions = {
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            }
            const localSDP = await peerConnection[method](offerOptions)

            await peerConnection.setLocalDescription(localSDP)

            if (peerConnection.localDescription) {
                socket.emit(type, room, peerConnection.localDescription)
            }
        } catch (err) {
            console.log('error: ', err)
        }
    }

    const createPeerConnection = () => {
        const configuration = {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
            ],
        }
        peerConnection = new RTCPeerConnection(configuration)

        localStream.getTracks().forEach((track: MediaStreamTrack) => {
            peerConnection!.addTrack(track, localStream)
        })

        peerConnection.onicecandidate = (e: RTCPeerConnectionIceEvent) => {
            if (e.candidate) {
                socket.emit('ice_candidate', room, {
                    label: e.candidate.sdpMLineIndex,
                    id: e.candidate.sdpMid,
                    candidate: e.candidate.candidate,
                })
            }
        }

        peerConnection.oniceconnectionstatechange = (e) => {
            const pc = e.target as RTCPeerConnection
            if (pc.iceConnectionState === 'disconnected') {
                hangup()
            }
        }

        peerConnection.ontrack = (event: RTCTrackEvent) => {
            const stream = event.streams[0]
            if (remoteMediaRef.current) {
                remoteMediaRef.current.srcObject = stream
            }
        }
    }

    const call = () => {
        socketConnect()
        createPeerConnection()
    }

    const hangup = () => {
        if (peerConnection === null || socket === null) {
            return
        }

        peerConnection.onicecandidate = null
        peerConnection.onnegotiationneeded = null
        peerConnection.close()
        peerConnection = null

        socket.emit('hangup', room)
        socket.close()

        remoteMediaRef.current!.srcObject = null
    }

    useEffect(() => {
        createStream()
        return () => {
            hangup()
        }
    }, [])

    return (
        <div className="flex h-screen flex-col bg-zinc-800">
            <div className="flex flex-1">
                <div className="flex flex-1 gap-3 px-5 pt-5">
                    <video
                        autoPlay
                        className="border-whit h-full w-1/2 rounded-3xl border-2 object-fill"
                        ref={remoteMediaRef}
                    />
                    <video
                        autoPlay
                        muted
                        className="h-full w-1/2 rounded-3xl border-2 border-white object-fill"
                        ref={localMediaRef}
                    />
                </div>
                {isChatOpen && (
                    <div className="mr-5 mt-5 flex w-96 flex-col justify-between gap-2 rounded-lg bg-white p-5 pt-2">
                        <button
                            className="text-end font-bold"
                            onClick={() => setIsChatOpen(!isChatOpen)}
                        >
                            X
                        </button>
                        <div className="custom-scrollbar flex shrink grow basis-0 flex-col gap-2 overflow-y-scroll"></div>
                        <div className="flex gap-2 rounded-full border-2 bg-slate-50 px-3">
                            <textarea
                                className="custom-scrollbar flex-1 resize-none break-words border-0 bg-slate-50 py-2 outline-none"
                                rows={1}
                            />
                            <IoSend className="h-7 w-7 self-center" />
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-5 flex h-20 justify-center gap-10">
                {isMicOpen ? (
                    <IoMdMic
                        onClick={() => setIsMicOpen(false)}
                        className="h-14 w-14 rounded-full bg-gray-200 p-3"
                    />
                ) : (
                    <IoMdMicOff
                        onClick={() => setIsMicOpen(true)}
                        className="h-14 w-14 rounded-full bg-red-600 p-3"
                    />
                )}
                <MdOutlineScreenShare className="h-14 w-14 rounded-full bg-gray-200 p-3" />
                <PiChatCircleText
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="h-14 w-14 rounded-full bg-gray-200 p-3"
                />
                <ImPhoneHangUp
                    className="h-14 w-14 cursor-pointer rounded-full bg-red-600 p-3"
                    onClick={hangup}
                />
            </div>
        </div>
    )
}
export default VideoConference
