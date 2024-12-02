import React, { useEffect, useRef } from 'react'
import { Props } from './types'
import rootStore from '~/store'

const RemoteVideo = ({ remoteId }: Props) => {
    const {
        videoConferenceStore: { peerConnectionList },
    } = rootStore
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!peerConnectionList[remoteId]) return

        peerConnectionList[remoteId].ontrack = (event) => {
            console.log('監聽到遠端媒體軌道')
            const [stream] = event.streams

            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        }
    }, [peerConnectionList])

    return (
        <video
            ref={videoRef}
            className="scale-x-[-1] rounded-3xl border-2 border-white"
            autoPlay
            muted
            id={remoteId}
        />
    )
}

export default RemoteVideo
