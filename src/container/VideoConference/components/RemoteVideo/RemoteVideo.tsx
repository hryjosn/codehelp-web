import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { cn } from '~/lib/utils'
import { Props } from './types'
import { useStore } from '~/store/rootStoreProvider'

const RemoteVideo = ({ remoteId }: Props) => {
    const {
        videoConferenceStore: { peerConnectionList },
    } = useStore()

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
            className={cn('w-full rounded-3xl border-2 border-white', {
                'scale-x-[-1]': !peerConnectionList[remoteId].isScreenSharing,
            })}
            autoPlay
            id={remoteId}
        />
    )
}

export default observer(RemoteVideo)
