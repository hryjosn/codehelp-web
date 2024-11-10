'use client'
import { useEffect, useRef, useState } from 'react'
import { ImPhoneHangUp } from 'react-icons/im'
import { IoMdMic, IoMdMicOff } from 'react-icons/io'
import { IoSend, IoVideocam, IoVideocamOff } from 'react-icons/io5'
import { MdOutlineScreenShare } from 'react-icons/md'
import { PiChatCircleText } from 'react-icons/pi'
import MessageBox from './components/MessageBox'
import { MOCK_MESSAGE_LIST } from './constant'
import { cn, socket } from '~/lib/utils'
import Link from 'next/link'
import {
    createPeerConnection,
    sendSDP,
    hangup,
    peerConnection,
    shareScreen,
    stopShareScreen,
} from './utils'
import { SDP_TYPE } from '~/lib/types'
import { observer } from 'mobx-react-lite'
import rootStore from '~/store'
import { runInAction } from 'mobx'
import { useRouter } from 'next/navigation'

const VideoConference = ({ params }: { params: { id: string } }) => {
    const {
        videoConferenceStore: { localStream },
    } = rootStore
    const [isMicOpen, setIsMicOpen] = useState(true)
    const [isCamOpen, setIsCamOpen] = useState(true)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [isLocalShareScreen, setIsLocalShareScreen] = useState(false)
    const [isRemoteShareScreen, setIsRemoteShareScreen] = useState(false)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)
    const localVideoRef = useRef<HTMLVideoElement>(null)

    const router = useRouter()

    useEffect(() => {
        socket.connect()
        ;(async function () {
            if (localVideoRef.current && localStream) {
                localVideoRef.current.srcObject = localStream

                createPeerConnection({
                    roomID: params.id,
                    remoteVideoRef,
                    localStream,
                })
            } else {
                if (peerConnection) {
                    peerConnection.onicecandidate = null
                    peerConnection.onnegotiationneeded = null
                    peerConnection?.close()
                }
                router.push(`/mentor-profile/${params.id}`)
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
            if (peerConnection) {
                await peerConnection.setRemoteDescription(desc)
                await sendSDP({ type: SDP_TYPE.ANSWER, roomID: params.id })
            }
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

        socket.on('remoteStartShare', async (isScreenSharing: boolean) => {
            setIsRemoteShareScreen(isScreenSharing)
        })

        socket.on('remoteStopShare', async (isScreenSharing: boolean) => {
            setIsRemoteShareScreen(isScreenSharing)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    const audioSwitch = () => {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
            const mediaStream = localVideoRef.current.srcObject as MediaStream
            const audioTracks = mediaStream.getAudioTracks()
            if (audioTracks.length > 0) {
                setIsMicOpen(!audioTracks[0].enabled)
                audioTracks[0].enabled = !audioTracks[0].enabled
            }
        }
    }

    const camSwitch = () => {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
            const mediaStream = localVideoRef.current.srcObject as MediaStream
            const audioTracks = mediaStream.getVideoTracks()
            if (audioTracks.length > 0) {
                setIsCamOpen(!audioTracks[0].enabled)
                audioTracks[0].enabled = !audioTracks[0].enabled
            }
        }
    }
    return (
        <div className="flex h-screen flex-col bg-zinc-800">
            <div className="flex flex-1">
                <div className="flex flex-1 gap-3 px-5 pt-5">
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        className={cn(
                            '`h-full border-white` w-1/2 rounded-3xl border-2',
                            { 'scale-x-[-1]': !isLocalShareScreen }
                        )}
                    >
                        user1
                    </video>
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                        muted
                        className={cn(
                            '`h-full border-white` w-1/2 rounded-3xl border-2',
                            { 'scale-x-[-1]': !isRemoteShareScreen }
                        )}
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
                        onClick={() => {
                            audioSwitch()
                        }}
                        className="h-14 w-14 rounded-full bg-gray-200 p-3"
                    />
                ) : (
                    <IoMdMicOff
                        onClick={() => {
                            audioSwitch()
                        }}
                        className="h-14 w-14 rounded-full bg-red-500 p-3"
                    />
                )}
                {isCamOpen ? (
                    <IoVideocam
                        onClick={() => {
                            camSwitch()
                        }}
                        className="h-14 w-14 rounded-full bg-gray-200 p-3"
                    />
                ) : (
                    <IoVideocamOff
                        onClick={() => {
                            camSwitch()
                        }}
                        className="h-14 w-14 rounded-full bg-red-500 p-3"
                    />
                )}
                {isLocalShareScreen === false ? (
                    <MdOutlineScreenShare
                        className={'h-14 w-14 rounded-full bg-gray-200 p-3'}
                        onClick={async () => {
                            await shareScreen(
                                localVideoRef,
                                setIsLocalShareScreen
                            )

                            socket.emit(
                                'remoteStartShare',
                                params.id,
                                isLocalShareScreen
                            )
                        }}
                    />
                ) : (
                    <MdOutlineScreenShare
                        className={'h-14 w-14 rounded-full bg-red-500 p-3'}
                        onClick={async () => {
                            await stopShareScreen(
                                localVideoRef,
                                setIsLocalShareScreen
                            )

                            socket.emit(
                                'remoteStopShare',
                                params.id,
                                isLocalShareScreen
                            )
                        }}
                    />
                )}
                <PiChatCircleText
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="h-14 w-14 rounded-full bg-gray-200 p-3"
                />
                <Link
                    href={`/mentor-profile/${params.id}`}
                    onClick={() => {
                        if (localStream) {
                            hangup({
                                roomID: params.id,
                                localStream: localStream,
                            })
                            runInAction(() => {
                                rootStore.videoConferenceStore.localStream =
                                    undefined
                            })
                        }
                    }}
                >
                    <ImPhoneHangUp className="h-14 w-14 rounded-full bg-red-500 p-3" />
                </Link>
            </div>
        </div>
    )
}
export default observer(VideoConference)
