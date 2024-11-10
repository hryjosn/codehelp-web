import React, { useEffect, useRef } from 'react'
import { Props } from './types'
import { peerConnection } from '../../utils'

const RemoteVideo = ({ remoteId }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!peerConnection) return

        peerConnection.ontrack = (event) => {
            console.log('監聽到遠端媒體軌道')
            const [stream] = event.streams

            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        }

        return () => {
            peerConnection.ontrack = null
        }
    }, [peerConnection])

    return (
        <video
            ref={videoRef}
            className="h-full scale-x-[-1] rounded-3xl border-2 border-white"
            autoPlay
            muted
            id={remoteId}
        />
    )
}

export default RemoteVideo
