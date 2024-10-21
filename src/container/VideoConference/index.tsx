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
    let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null
    let localStream: any
    const room = 'room1'

    const socketConnect = () => {
        socket = io('localhost:80', {
            transports: ['websocket'],
        })

        // 發送房間資訊
        socket.emit('join', room)

        // 監聽加入房間
        socket.on('ready', (msg) => {
            // 發送 Offer SDP
            sendSDP('offer')
        })

        // 監聽收到 Offer
        socket.on('offer', async (desc) => {
            if (peerConnection === null) {
                return
            }
            // 設定對方的媒體串流
            await peerConnection.setRemoteDescription(desc)
            // 發送 Answer SDP
            await sendSDP('answer')
        })

        // 監聽收到 Answer
        socket.on('answer', (desc) => {
            if (peerConnection === null) {
                return
            }
            // 設定對方的媒體串流
            peerConnection.setRemoteDescription(desc)
        })

        // 監聽收到 ICE 候選位址
        socket.on('ice_candidate', (data) => {
            if (peerConnection === null) {
                return
            }
            // RTCIceCandidate 用以定義 ICE 候選位址
            const candidate = new RTCIceCandidate({
                sdpMLineIndex: data.label,
                candidate: data.candidate,
            })
            // 加入 ICE 候選位址
            peerConnection.addIceCandidate(candidate)
        })
    }

    const createStream = async () => {
        try {
            const constraints = {
                audio: true,
                video: true,
            }
            const stream =
                await navigator.mediaDevices.getUserMedia(constraints)
            if (localMediaRef.current) {
                localMediaRef.current.srcObject = stream
            }
            localStream = stream
        } catch (err) {
            throw err
        }
    }

    const sendSDP = async (type: 'offer' | 'answer') => {
        try {
            if (!peerConnection) {
                console.log('尚未開啟視訊')
                return
            }

            const method = type === 'offer' ? 'createOffer' : 'createAnswer'
            const offerOptions = {
                offerToReceiveAudio: true, // 是否傳送聲音流給對方
                offerToReceiveVideo: true, // 是否傳送影像流給對方
            }

            // 建立 SDP
            const localSDP = await peerConnection[method](offerOptions)

            // 設定本地 SDP
            await peerConnection.setLocalDescription(localSDP)

            // 發送 SDP
            if (peerConnection.localDescription) {
                socket!.emit(type, room, peerConnection.localDescription)
            } else {
                console.error('Local description is null, cannot send SDP.')
            }
        } catch (err) {
            console.log('error: ', err)
        }
    }

    const createPeerConnection = () => {
        // 設定 iceServer
        const configuration = {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
            ],
        }
        // 建立 RTCPeerConnection
        peerConnection = new RTCPeerConnection(configuration)

        // 增加本地串流
        localStream!.getTracks().forEach((track: any) => {
            peerConnection!.addTrack(track, localStream)
        })

        // 找尋到 ICE 候選位址後，送去 Server 與另一位配對
        peerConnection.onicecandidate = (e) => {
            if (socket === null) return
            if (e.candidate) {
                // 發送 ICE
                socket.emit('ice_candidate', room, {
                    label: e.candidate.sdpMLineIndex,
                    id: e.candidate.sdpMid,
                    candidate: e.candidate.candidate,
                })
            }
        }

        // 監聽 ICE 連接狀態
        peerConnection.oniceconnectionstatechange = (e) => {
            // 若連接已斷，執行掛斷相關動作
            if (e.target!.iceConnectionState === 'disconnected') {
                hangup()
            }
        }

        // 監聽是否有媒體串流傳入
        peerConnection.addStream = ({ stream }: any) => {
            // Dom 加入遠端串流
            remoteMediaRef.current!.srcObject = stream
        }
    }

    // 開始連線
    const call = () => {
        socketConnect() // socket 連線
        createPeerConnection() // 建立 P2P 連線
    }

    // 關閉連線
    const hangup = () => {
        // 移除事件監聽
        if (peerConnection === null || socket === null) {
            return
        }

        peerConnection.onicecandidate = null
        peerConnection.onnegotiationneeded = null

        // 關閉 RTCPeerConnection 連線並釋放記憶體
        peerConnection.close()
        peerConnection = null

        // 傳遞掛斷事件給 Server
        socket.emit('hangup', room)
        socket = null

        // 移除遠端 video src
        remoteMediaRef.current!.srcObject = null // 移除遠端媒體串流
    }

    useEffect(() => {
        createStream()
    }, [])

    return (
        <div className="flex h-screen flex-col bg-zinc-800">
            <button onClick={call}>call</button>
            <div className="flex flex-1">
                <div className="flex flex-1 gap-3 px-5 pt-5">
                    <video
                        autoPlay
                        className="h-full w-1/2 rounded-3xl border-2 border-white"
                        ref={remoteMediaRef}
                    >
                        user1
                    </video>
                    <video
                        autoPlay
                        muted
                        className="h-full w-1/2 rounded-3xl border-2 border-white"
                        ref={localMediaRef}
                    >
                        user2
                    </video>
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
