import React, { useEffect, useRef } from 'react'
import { Props } from './types'
import rootStore from '~/store'
import { cn } from '~/lib/utils'
import { observer } from 'mobx-react-lite'

const RemoteVideo = ({ remoteId }: Props) => {
    const {
        videoConferenceStore: { peerConnectionList },
    } = rootStore
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!peerConnectionList[remoteId]) return

        peerConnectionList[remoteId].peerConnection.ontrack = (event) => {
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
            className={cn('h-full w-1/2 rounded-3xl border-2 border-white', {
                'scale-x-[-1]': !peerConnectionList[remoteId].isScreenSharing,
            })}
            autoPlay
            muted
            id={remoteId}
        />
    )
}

export default observer(RemoteVideo)
