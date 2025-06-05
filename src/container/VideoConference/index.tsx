'use client'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { ImPhoneHangUp } from 'react-icons/im'
import { IoMdMic, IoMdMicOff } from 'react-icons/io'
import { IoVideocam, IoVideocamOff } from 'react-icons/io5'
import { MdOutlineScreenShare } from 'react-icons/md'
import { PiChatCircleText } from 'react-icons/pi'
import { useGetUserInfo } from '~/api/user/user'
import ButtonInput from '~/components/ButtonInput/ButtonInput'
import { Link, useRouter } from '~/i18n/routing'
import { cn } from '~/lib/utils'
import { useStore } from '~/store/rootStoreProvider'
import MessageBox from './components/MessageBox'
import RemoteVideo from './components/RemoteVideo/RemoteVideo'
import {
    createLocalStream,
    hangup,
    sendAnswerSDP,
    sendOfferSDP,
    shareScreen,
    stopShareScreen,
} from './utils'
import { useToast } from '~/hooks/use-toast'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '~/lib/types'

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null

const VideoConference = ({ params }: { params: { id: string } }) => {
    const {
        videoConferenceStore: {
            peerConnectionList,
            chatList,
            isLocalShareScreen,
            isMicOpen,
            isWebcamOpen,
            removeConnectionMember,
            addIceCandidate,
            clearPeerConnections,
            setRemoteDescription,
            addMessage,
            resetChatList,
            registerShareScreenSocketEvents,
            setIsMicOpen,
            setIsWebcamOpen,
        },
    } = useStore()
    const { data: userData } = useGetUserInfo()

    const date = new Date()

    const [isChatOpen, setIsChatOpen] = useState(false)
    const [content, setContent] = useState('')
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const localStreamRef = useRef<MediaStream | undefined>(undefined)
    const { toast } = useToast()

    const router = useRouter()

    useEffect(() => {
        socket = io(process.env.NEXT_PUBLIC_API_URL)
        ;(async function () {
            const { localStream: localStreamData, errMsg } =
                await createLocalStream()

            localStreamRef.current = localStreamData

            if (errMsg) {
                toast({
                    title: 'Connecting failed',
                    description: String(errMsg),
                })
                clearPeerConnections()
                router.push(`/mentor-profile/${params.id}`)
                return
            }

            if (localVideoRef.current && localStreamRef.current && socket) {
                localVideoRef.current.srcObject = localStreamRef.current
                socket.emit('join', params.id)
            }
        })()

        socket?.on('ready', (id, roomMembers) => {
            if (socket!.id && roomMembers.length > 1) {
                roomMembers.forEach((remoteId) => {
                    if (remoteId === id) {
                        sendOfferSDP({
                            remoteId,
                            localStreamRef,
                            socket: socket!,
                        })
                    }
                })
            }
        })

        socket?.on('leave', (remoteId) => {
            removeConnectionMember(remoteId)
        })

        socket?.on('offer', async (desc, remoteId) => {
            console.log('收到 offer')
            await sendAnswerSDP({
                localStreamRef,
                remoteId,
                desc,
                socket: socket!,
            })
        })

        socket?.on('answer', (desc, remoteId) => {
            console.log('收到 answer')
            setRemoteDescription({ remoteId, desc })
        })

        socket?.on('ice_candidate', (data, remoteId) => {
            console.log('收到 ice_candidate')

            const candidate = new RTCIceCandidate({
                sdpMLineIndex: data.label,
                sdpMid: data.id,
                candidate: data.candidate,
            })
            addIceCandidate({ remoteId, candidate })
        })

        socket?.on('receiveMessage', (msgData) => {
            const date = new Date(msgData.createdAt)
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

            const localTime = date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
                timeZone,
            })

            addMessage({ ...msgData, createdAt: localTime })
        })

        registerShareScreenSocketEvents(socket)

        return () => {
            if (socket) {
                socket.off('ready')
                socket.off('leave')
                socket.off('offer')
                socket.off('answer')
                socket.off('ice_candidate')
                socket.off('receiveMessage')
                socket.off('remoteStartShare')
                socket.off('remoteStopShare')
                socket.disconnect()
                resetChatList()
                setIsMicOpen(true)
                setIsWebcamOpen(true)
            }
        }
    }, [])

    const audioSwitch = () => {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
            const mediaStream = localVideoRef.current.srcObject as MediaStream
            const audioTracks = mediaStream.getAudioTracks()
            setIsMicOpen(!audioTracks[0].enabled)
            audioTracks[0].enabled = !audioTracks[0].enabled
        }
    }

    const camSwitch = () => {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
            const mediaStream = localVideoRef.current.srcObject as MediaStream
            const videoTracks = mediaStream.getVideoTracks()
            setIsWebcamOpen(!videoTracks[0].enabled)
            videoTracks[0].enabled = !videoTracks[0].enabled
        }
    }
    return (
        <div className="flex h-screen flex-col bg-zinc-800">
            <div className="flex flex-1">
                <div className="flex flex-1">
                    <div className="flex flex-1 justify-center px-5 pt-5">
                        <video
                            ref={localVideoRef}
                            autoPlay
                            muted
                            className={cn('rounded-3xl border-2 border-white', {
                                'scale-x-[-1]': !isLocalShareScreen,
                            })}
                        >
                            user1
                        </video>
                    </div>
                    {Object.keys(peerConnectionList).length > 0 &&
                        Object.keys(peerConnectionList).map((key) => (
                            <RemoteVideo key={key} remoteId={key} />
                        ))}
                </div>
                {isChatOpen && (
                    <div className="mr-5 mt-5 flex w-96 flex-col justify-between gap-2 rounded-lg bg-white p-5 pt-2">
                        <button
                            className="text-end font-bold"
                            onClick={() => setIsChatOpen(!isChatOpen)}
                        >
                            X
                        </button>
                        <div className="custom-scrollbar flex shrink grow basis-0 flex-col flex-col-reverse gap-2 overflow-y-scroll">
                            {chatList.length > 0 &&
                                chatList.map((data) => (
                                    <div className="mt-3" key={data.id}>
                                        <MessageBox
                                            name={data.user.userName}
                                            time={data.createdAt}
                                            message={data.content}
                                        />
                                    </div>
                                ))}
                        </div>
                        <div className="flex justify-center pr-3">
                            <ButtonInput
                                value={content}
                                maxRows={10}
                                placeholder="Write something..."
                                onChange={(e) => {
                                    setContent(e.target.value)
                                }}
                                onClick={() => {
                                    if (socket && content) {
                                        socket.emit('sendMessage', {
                                            id: date.getTime().toString(),
                                            user: {
                                                id: userData.user.id,
                                                userName:
                                                    userData.user.userName,
                                                avatar: userData.user.avatar,
                                            },
                                            roomId: params.id,
                                            content,
                                            createdAt: date.toISOString(),
                                            type: 0,
                                        })
                                    }
                                    setContent('')
                                }}
                            />
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
                        className="h-14 w-14 cursor-pointer rounded-full bg-gray-200 p-3"
                    />
                ) : (
                    <IoMdMicOff
                        onClick={() => {
                            audioSwitch()
                        }}
                        className="h-14 w-14 cursor-pointer rounded-full bg-red-500 p-3"
                    />
                )}
                {isWebcamOpen ? (
                    <IoVideocam
                        onClick={() => {
                            camSwitch()
                        }}
                        className="h-14 w-14 cursor-pointer rounded-full bg-gray-200 p-3"
                    />
                ) : (
                    <IoVideocamOff
                        onClick={() => {
                            camSwitch()
                        }}
                        className="h-14 w-14 cursor-pointer rounded-full bg-red-500 p-3"
                    />
                )}
                {isLocalShareScreen === false ? (
                    <MdOutlineScreenShare
                        className={
                            'h-14 w-14 cursor-pointer rounded-full bg-gray-200 p-3'
                        }
                        onClick={async () => {
                            if (socket) {
                                await shareScreen({
                                    localVideoRef,
                                    paramId: params.id,
                                    socket,
                                    localStreamRef,
                                })
                            }
                        }}
                    />
                ) : (
                    <MdOutlineScreenShare
                        className={
                            'h-14 w-14 cursor-pointer rounded-full bg-red-500 p-3'
                        }
                        onClick={async () => {
                            if (socket) {
                                await stopShareScreen({
                                    localVideoRef,
                                    paramId: params.id,
                                    socket,
                                    localStreamRef,
                                })
                            }
                        }}
                    />
                )}
                <PiChatCircleText
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="h-14 w-14 cursor-pointer rounded-full bg-gray-200 p-3"
                />
                <Link href={`/mentor-profile/${params.id}`}>
                    <ImPhoneHangUp
                        onClick={() => {
                            if (
                                localStreamRef.current &&
                                socket?.id &&
                                localVideoRef.current
                            ) {
                                hangup({
                                    roomId: params.id,
                                    localStreamRef,
                                    remoteId: socket.id,
                                    socket,
                                    localVideoRef,
                                })
                                localVideoRef.current.srcObject = null
                            }
                        }}
                        className="h-14 w-14 rounded-full bg-red-600 p-3"
                    />
                </Link>
            </div>
        </div>
    )
}
export default observer(VideoConference)
