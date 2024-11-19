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
import Link from 'next/link'
import { hangup, sendAnswerSDP, sendOfferSDP } from './utils'
import { observer } from 'mobx-react-lite'
import rootStore from '~/store'
import { runInAction } from 'mobx'
import { useRouter } from 'next/navigation'
import RemoteVideo from './components/RemoteVideo/RemoteVideo'

const VideoConference = ({ params }: { params: { id: string } }) => {
    const {
        videoConferenceStore: { localStream, peerConnectionList },
        videoConferenceStore,
    } = rootStore
    const [isMicOpen, setIsMicOpen] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const localVideoRef = useRef<HTMLVideoElement>(null)

    const router = useRouter()

    useEffect(() => {
        if (!socket.connected) {
            socket.connect()
        }
        ;(async function () {
            if (localVideoRef.current && localStream) {
                localVideoRef.current.srcObject = localStream
                socket.emit('join', params.id)
            } else {
                runInAction(() => {
                    videoConferenceStore.peerConnectionList = {}
                })
                router.push(`/mentor-profile/${params.id}`)
            }
        })()

        socket.on('ready', (id, roomMembers) => {
            if (socket.id && roomMembers.length > 1) {
                roomMembers.forEach((remoteId) => {
                    if (remoteId === id) {
                        sendOfferSDP({
                            remoteId,
                            localStream: localStream!,
                        })
                    }
                })
            }
        })

        socket.on('leave', (remoteId) => {
            runInAction(() => {
                videoConferenceStore.peerConnectionList[
                    remoteId
                ].onicecandidate = null
                videoConferenceStore.peerConnectionList[
                    remoteId
                ].onnegotiationneeded = null
                videoConferenceStore.peerConnectionList[
                    remoteId
                ].oniceconnectionstatechange = null

                videoConferenceStore.peerConnectionList[remoteId].close()
                delete videoConferenceStore.peerConnectionList[remoteId]
            })
        })

        socket.on('offer', async (desc, remoteId) => {
            console.log('收到 offer')
            await sendAnswerSDP({
                localStream: localStream!,
                remoteId,
                desc,
            })
        })

        socket.on('answer', (desc, remoteId) => {
            console.log('收到 answer')
            runInAction(() => {
                videoConferenceStore.peerConnectionList[
                    remoteId
                ].setRemoteDescription(desc)
            })
        })

        socket.on('ice_candidate', (data, remoteId) => {
            console.log('收到 ice_candidate')

            const candidate = new RTCIceCandidate({
                sdpMLineIndex: data.label,
                candidate: data.candidate,
            })

            runInAction(() => {
                videoConferenceStore.peerConnectionList[
                    remoteId
                ].addIceCandidate(candidate)
            })
        })

        return () => {
            socket.off('ready')
            socket.off('leave')
            socket.off('offer')
            socket.off('answer')
            socket.off('ice_candidate')
            socket.disconnect()
        }
    }, [])

    return (
        <div className="flex h-screen flex-col bg-zinc-800">
            <div className="flex flex-1">
                <div className="flex justify-center px-5 pt-5">
                    <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        className="scale-x-[-1] rounded-3xl border-2 border-white"
                    >
                        user1
                    </video>
                </div>
                {Object.keys(peerConnectionList).length > 0 &&
                    Object.keys(peerConnectionList).map((key) => (
                        <div key={key} className="flex px-5 pt-5">
                            <RemoteVideo remoteId={key} />
                        </div>
                    ))}
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
                <Link href={`/mentor-profile/${params.id}`}>
                    <ImPhoneHangUp
                        onClick={() => {
                            if (localStream && socket.id) {
                                hangup({
                                    roomId: params.id,
                                    localStream: localStream,
                                    remoteId: socket.id,
                                })
                                runInAction(() => {
                                    videoConferenceStore.localStream = undefined
                                })
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
