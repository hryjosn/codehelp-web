'use client'
import { useEffect, useRef, useState } from 'react'
import { ImPhoneHangUp } from 'react-icons/im'
import { IoMdMic, IoMdMicOff } from 'react-icons/io'
import { IoSend } from 'react-icons/io5'
import { MdOutlineScreenShare } from 'react-icons/md'
import { PiChatCircleText } from 'react-icons/pi'
import MessageBox from './components/MessageBox'
import { MOCK_MESSAGE_LIST } from './constant'
import { socket } from '~/lib/utils'
import {
    createLocalStream,
    createPeerConnection,
    sendSDP,
    hangup,
    peerConnection,
} from './utils'
import { SDP_TYPE } from '~/lib/types'

const VideoConference = ({ params }: { params: { id: string } }) => {
    const [isMicOpen, setIsMicOpen] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)
    const localVideoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        ;(async function () {
            const localStream = await createLocalStream()
            if (localVideoRef.current && localStream) {
                localVideoRef.current.srcObject = localStream

                createPeerConnection({
                    roomID: params.id,
                    remoteVideoRef,
                    localStream,
                })
            }

            socket.emit('join', params.id)
        })()

        socket.on('ready', () => {
            sendSDP({ type: SDP_TYPE.OFFER, roomID: params.id })
        })

        socket.on('otherUserHangup', () => {
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null
        })

        socket.on('offer', async (desc: RTCSessionDescriptionInit) => {
            await peerConnection.setRemoteDescription(desc)
            await sendSDP({ type: SDP_TYPE.ANSWER, roomID: params.id })
        })

        socket.on('answer', async (desc) => {
            await peerConnection.setRemoteDescription(desc)
        })

        socket.on('ice_candidate', (data) => {
            const candidate = new RTCIceCandidate({
                sdpMLineIndex: data.label,
                candidate: data.candidate,
            })
            peerConnection.addIceCandidate(candidate)
        })
        return () => {
            socket.disconnect()
        }
    }, [])

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
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        muted
                        className="h-full w-1/2 scale-x-[-1] rounded-3xl border-2 border-white"
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
                    onClick={() => hangup(params.id)}
                />
            </div>
        </div>
    )
}
export default VideoConference
