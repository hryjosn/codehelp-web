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
    hangUp,
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

            createPeerConnection({
                roomId: params.id,
                remoteVideoRef,
            })
            console.log('create', peerConnection)

            socket.emit('join', params.id)
        })()

        // 監聽ready事件，有人加入時
        socket.on('ready', async (msg) => {
            console.log('send offer')

            if (
                peerConnection.connectionState === 'closed' &&
                peerConnection.iceConnectionState === 'closed' &&
                peerConnection.signalingState === 'closed'
            ) {
                console.log('closed')
                createPeerConnection({
                    roomId: params.id,
                    remoteVideoRef,
                })
            }
            // 建立Offer SDP 加入 PeerConnection.localDescription
            await setLocalSDP(SDP_TYPE.OFFER)

            // 發送 Offer SDP
            if (!peerConnection.localDescription) {
                console.log('localDescription is null')
            } else {
                console.log('send offer')
                socket.emit('offer', params.id, peerConnection.localDescription)
            }
        })
        // 監聽offer，當收到時
        socket.on('offer', async (desc) => {
            console.log('receive offer')
            // 建立Answer SDP 加入 PeerConnection.localDescription
            await setLocalSDP(SDP_TYPE.ANSWER)
            // 設定對方的媒體串流
            await peerConnection.setRemoteDescription(desc)
            console.log('after set remote', peerConnection.remoteDescription)

            // 發送 Answer SDP
            if (!peerConnection.localDescription) {
                console.log('localDescription is null')
            } else {
                console.log('send answer')

                socket.emit(
                    'answer',
                    params.id,
                    peerConnection.localDescription
                )
            }
        })
        // 監聽answer，當收到時
        socket.on('answer', async (desc) => {
            // 設定對方的媒體串流
            console.log('receive answer')
            await peerConnection.setRemoteDescription(desc)
            console.log('after set remote', peerConnection.remoteDescription)
        })
        // 監聽iceCandidate，當收到時
        socket.on('iceCandidate', async (data) => {
            console.log('receive ice')
            // RTCIceCandidate 用以定義 ICE 候選位址
            const candidate = new RTCIceCandidate({
                sdpMLineIndex: data.label,
                candidate: data.candidate,
            })
            // 加入 ICE 候選位址
            await peerConnection.addIceCandidate(candidate)
        })
        socket.on('leave', () => {
            console.log('leave')
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null
            peerConnection.close()
            console.log(peerConnection)
        })

        return () => {
            hangUp(params.id)
        }
    }, [])

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
                        hangUp(params.id)
                        router.back()
                    }}
                    className="h-14 w-14 cursor-pointer rounded-full bg-red-600 p-3"
                />
            </div>
        </div>
    )
}
export default VideoConference
