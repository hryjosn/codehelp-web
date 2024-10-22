'use client'
import { useEffect, useRef, useState } from 'react'
import MessageBox from './components/MessageBox'
import { IoMdMic, IoMdMicOff } from 'react-icons/io'
import { MdOutlineScreenShare } from 'react-icons/md'
import { ImPhoneHangUp } from 'react-icons/im'
import { IoSend } from 'react-icons/io5'
import { PiChatCircleText } from 'react-icons/pi'
import { MOCK_MESSAGE_LIST, PC_CONFIG } from './constant'
import { io, Socket } from 'socket.io-client'
import { ClientToServerEvents, SDP_TYPE, ServerToClientEvents } from './types'
import {
    createPeerConnection,
    getLocalMedia,
    peerConnection,
    setLocalSDP,
} from './utils'
import { socket } from '~/lib/utils'
import { useRouter } from 'next/navigation'

const VideoConference = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const [isMicOpen, setIsMicOpen] = useState(true)
    const [isChatOpen, setIsChatOpen] = useState(false)
    let localVideoRef = useRef<HTMLVideoElement>(null)
    let remoteVideoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        ;(async function () {
            //第二步取得 Local stream
            const localStream = await getLocalMedia()
            //第三步設定 Local video src
            if (localVideoRef.current)
                localVideoRef.current.srcObject = localStream

            createPeerConnection()
            console.log('create', peerConnection)

            socket.emit('join', params.id)

            if (peerConnection) {
                peerConnection.onicecandidate = (e) => {
                    if (e.candidate) {
                        // 發送 ICE
                        socket.emit('iceCandidate', params.id, {
                            label: e.candidate.sdpMLineIndex,
                            id: e.candidate.sdpMid,
                            candidate: e.candidate.candidate,
                        })
                    }
                }

                //監聽 ICE 連接狀態
                peerConnection.oniceconnectionstatechange = () => {
                    // 若連接已斷，執行掛斷相關動作
                    if (peerConnection.iceConnectionState === 'disconnected') {
                        console.log('hang up')

                        hangUp()
                    }
                }

                // 監聽是否有媒體串流傳入
                peerConnection.ontrack = (e) => {
                    if (remoteVideoRef.current) {
                        console.log('set remote')
                        remoteVideoRef.current.srcObject = e.streams[0]
                    }
                }
            }
            // 監聽ready事件，有人加入時
            socket.on('ready', async (msg) => {
                console.log('send offer')
                // 建立Offer SDP 加入 PeerConnection.localDescription
                await setLocalSDP(SDP_TYPE.OFFER)
                console.log('set local des', peerConnection)

                // 發送 Offer SDP
                if (!peerConnection.localDescription) {
                    console.log('localDescription is null')
                } else {
                    socket.emit(
                        'offer',
                        params.id,
                        peerConnection.localDescription
                    )
                }
            })
            // 監聽offer，當收到時
            socket.on('offer', async (desc) => {
                console.log('receive offer')
                // 設定對方的媒體串流
                await peerConnection.setRemoteDescription(desc)
                // 建立Answer SDP 加入 PeerConnection.localDescription
                await setLocalSDP(SDP_TYPE.ANSWER)
                console.log('set local des', peerConnection)

                // 發送 Answer SDP
                if (!peerConnection.localDescription) {
                    console.log('localDescription is null')
                } else {
                    socket.emit(
                        'answer',
                        params.id,
                        peerConnection.localDescription
                    )
                }
            })
            socket.on('answer', (desc) => {
                // 設定對方的媒體串流
                peerConnection.setRemoteDescription(desc)
            })
            socket.on('iceCandidate', async (data) => {
                // RTCIceCandidate 用以定義 ICE 候選位址
                const candidate = new RTCIceCandidate({
                    sdpMLineIndex: data.label,
                    candidate: data.candidate,
                })
                // 加入 ICE 候選位址
                await peerConnection.addIceCandidate(candidate)
                console.log('add ice')
            })
        })()
    }, [])

    const hangUp = () => {
        peerConnection?.close()
        remoteVideoRef.current!.srcObject = null
        socket.emit('leave', params.id)
        console.log(peerConnection)
    }

    return (
        <div className="flex h-screen flex-col bg-zinc-800">
            <div className="flex flex-1">
                <div className="flex flex-1 gap-3 px-5 pt-5">
                    <video
                        autoPlay
                        muted={isMicOpen}
                        className="h-full w-1/2 rounded-3xl border-2 border-white"
                        ref={localVideoRef}
                    >
                        user1
                    </video>
                    <video
                        autoPlay
                        muted
                        className="h-full w-1/2 rounded-3xl border-2 border-white"
                        ref={remoteVideoRef}
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
                        className="h-14 w-14 cursor-pointer rounded-full bg-gray-200 p-3"
                    />
                ) : (
                    <IoMdMicOff
                        onClick={() => setIsMicOpen(true)}
                        className="h-14 w-14 cursor-pointer rounded-full bg-red-600 p-3"
                    />
                )}
                <MdOutlineScreenShare className="h-14 w-14 cursor-pointer rounded-full bg-gray-200 p-3" />
                <PiChatCircleText
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="h-14 w-14 cursor-pointer rounded-full bg-gray-200 p-3"
                />
                <ImPhoneHangUp
                    onClick={() => {
                        hangUp()
                        router.back()
                    }}
                    className="h-14 w-14 cursor-pointer rounded-full bg-red-600 p-3"
                />
            </div>
        </div>
    )
}
export default VideoConference
