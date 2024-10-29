'use client'
import { useEffect, useRef, useState } from 'react'
import { ImPhoneHangUp } from 'react-icons/im'
import { IoMdMic, IoMdMicOff } from 'react-icons/io'
import { IoSend } from 'react-icons/io5'
import { MdOutlineScreenShare } from 'react-icons/md'
import { PiChatCircleText } from 'react-icons/pi'
import * as io from 'socket.io-client'
import MessageBox from './components/MessageBox'

const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        },
        {
            urls: 'stun:stun.xten.com',
        },
    ],
}
const room = 'testRoom'
const VideoConference = () => {
    const socketRef = useRef<io.Socket | null>(null)

    const socket = socketRef.current
    const [isMicOpen, setIsMicOpen] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const MOCK_MESSAGE_LIST = [
        {
            name: 'user1',
            time: '下午1:00',
            message:
                'hihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihi',
        },
        { name: 'user2', time: '下午1:01', message: 'hello' },
        { name: 'user1', time: '下午1:10', message: 'hi' },
        { name: 'user2', time: '下午1:11', message: 'hello' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user1', time: '下午1:12', message: 'hi' },
        { name: 'user2', time: '下午1:01', message: 'hello' },
        { name: 'user1', time: '下午1:10', message: 'hi' },
        { name: 'user2', time: '下午1:11', message: 'hello' },
    ]

    const [localStream, setLocalStream] = useState<MediaStream>()
    const [remote, setRemote] = useState<MediaStream>()
    const pcPeersRef = useRef<RTCPeerConnection | null>(null)
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
    const localVideoRef = useRef<HTMLVideoElement | null>(null)

    const join = (stream: MediaStream) => {
        console.log('socket join', socketRef.current)
        socketRef.current?.emit('join', room)
        createPeerConnection(stream)
    }

    const hangup = () => {
        if (pcPeersRef.current) {
            pcPeersRef.current.onicecandidate = null
            pcPeersRef.current.onnegotiationneeded = null
            pcPeersRef.current?.close()
        }

        socketRef.current?.emit('hangup', room)
        pcPeersRef.current = null
        setRemote(undefined)
    }

    const createPeerConnection = (stream: MediaStream) => {
        const peers: RTCPeerConnection = new RTCPeerConnection(configuration)
        pcPeersRef.current = peers

        stream?.getTracks().forEach((track) => {
            peers.addTrack(track, stream)
        })

        peers.onicecandidate = (e) => {
            if (e.candidate) {
                socketRef.current?.emit('ice_candidate', room, {
                    label: e.candidate.sdpMLineIndex,
                    id: e.candidate.sdpMid,
                    candidate: e.candidate.candidate,
                })
            }
        }

        peers.oniceconnectionstatechange = (e) => {
            const peerConnection = e.target as RTCPeerConnection
            if (peerConnection.iceConnectionState === 'disconnected') {
                hangup()
            }
        }

        peers.ontrack = (event) => {
            const [stream] = event.streams
            setRemote(stream)
        }
    }

    const createLocalStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            })
            setLocalStream(stream)
            join(stream)
        } catch (err) {
            console.log('getUserMedia error: ', err)
        }
    }

    const sendSDP = async (type: string) => {
        try {
            if (!pcPeersRef.current) {
                console.log('尚未開啟視訊')
                return
            }

            const method = type === 'offer' ? 'createOffer' : 'createAnswer'

            const localSDP = await pcPeersRef.current?.[method]({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            })
            await pcPeersRef.current?.setLocalDescription(localSDP)
            socketRef.current?.emit(
                type,
                room,
                pcPeersRef.current?.localDescription
            )
        } catch (err) {
            console.log('error: ', err)
        }
    }

    useEffect(() => {
        socketRef.current = io.connect('http://localhost:80')
        createLocalStream()

        socketRef.current?.on('ready', () => {
            sendSDP('offer')
        })

        socketRef.current?.on('otherUserHangup', () => {
            setRemote(undefined)
        })

        socketRef.current?.on(
            'offer',
            async (desc: RTCSessionDescriptionInit) => {
                if (pcPeersRef.current) {
                    await pcPeersRef.current?.setRemoteDescription(desc)
                    await sendSDP('answer')
                }
            }
        )

        socketRef.current?.on('answer', async (desc) => {
            if (pcPeersRef.current) {
                await pcPeersRef.current?.setRemoteDescription(desc)
            }
        })

        socketRef.current?.on('ice_candidate', (data) => {
            const candidate = new RTCIceCandidate({
                sdpMLineIndex: data.label,
                candidate: data.candidate,
            })
            pcPeersRef.current?.addIceCandidate(candidate)
        })
        return () => {
            socketRef.current?.disconnect()
        }
    }, [])

    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream
        }
    }, [localStream])

    useEffect(() => {
        if (remoteVideoRef.current && remote) {
            remoteVideoRef.current.srcObject = remote
        }
    }, [remote])

    return (
        <div className="flex h-screen flex-col bg-zinc-800">
            <div className="flex flex-1">
                <div className="flex flex-1 gap-3 px-5 pt-5">
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        className="h-full w-1/2 scale-x-[-1] rounded-3xl border-2 border-white"
                    >
                        user1
                    </video>
                    {remote && (
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            muted
                            className="h-full w-1/2 scale-x-[-1] rounded-3xl border-2 border-white"
                        >
                            user2
                        </video>
                    )}
                </div>
                {isChatOpen && (
                    <div className="mr-5 mt-5 flex w-96 flex-col justify-between gap-2 rounded-lg bg-white p-5 pt-2">
                        <button
                            className="text-end font-bold"
                            onClick={() => setIsChatOpen(!isChatOpen)}
                        >
                            X
                        </button>
                        <div className="custom-scrollbar flex shrink grow basis-0 flex-col gap-2 overflow-y-scroll">
                            {MOCK_MESSAGE_LIST.map((data, index) => (
                                <MessageBox
                                    name={data.name}
                                    time={data.time}
                                    message={data.message}
                                    key={index}
                                />
                            ))}
                        </div>
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
                    className="h-14 w-14 rounded-full bg-red-600 p-3"
                    onClick={hangup}
                />
            </div>
        </div>
    )
}
export default VideoConference
