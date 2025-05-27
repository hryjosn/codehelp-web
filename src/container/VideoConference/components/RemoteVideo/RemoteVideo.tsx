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
    const containerRef = useRef<HTMLDivElement>(null)

    const handleFullscreen = () => {
        const containerElement = containerRef.current
        if (!containerElement) return

        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            try {
                containerElement.requestFullscreen()
            } catch (error) {
                console.error('Failed to enter fullscreen:', error)
            }
        }
    }

    useEffect(() => {
        if (!peerConnectionList?.[remoteId]) return

        peerConnectionList[remoteId].peerConnection.ontrack = (event) => {
            const [stream] = event.streams

            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        }
    }, [peerConnectionList, remoteId])

    return (
        <div
            ref={containerRef}
            className="flex flex-1 cursor-pointer justify-center px-5 pt-5"
            title="點擊切換全螢幕模式"
            onClick={handleFullscreen}
        >
            <video
                ref={videoRef}
                className={cn('w-full rounded-3xl border border-white', {
                    'scale-x-[-1]':
                        !peerConnectionList?.[remoteId].isScreenSharing,
                })}
                autoPlay
                id={remoteId}
            />
        </div>
    )
}

export default observer(RemoteVideo)
