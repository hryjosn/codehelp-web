'use client'

import { HiPhone } from 'react-icons/hi2'
import { useRouter } from '~/i18n/routing'
import { createLocalStream } from '~/container/VideoConference/utils'
import LoadingModal from '~/components/LoadingModal/LoadingModal'
import { useState } from 'react'
import { useStore } from '~/store/rootStoreProvider'
import { useToast } from '~/hooks/use-toast'

const PhoneIcon = ({ mentorId }: { mentorId: string }) => {
    const router = useRouter()
    const {
        videoConferenceStore: { connectSocket, setLocalStream },
    } = useStore()
    const { toast } = useToast()

    const [modalVisible, setModalVisible] = useState(false)
    return (
        <>
            <HiPhone
                className="cursor-pointer"
                size={30}
                onClick={async () => {
                    setModalVisible(true)
                    const { localStream, errMsg } = await createLocalStream()
                    connectSocket()
                    setLocalStream(localStream)

                    if (localStream) {
                        router.push(`/video-conference/${mentorId}`)
                    }
                    if (errMsg) {
                        toast({
                            title: 'Connecting failed',
                            description: String(errMsg),
                        })
                    }
                    setModalVisible(false)
                }}
            />
            <LoadingModal visible={modalVisible} />
        </>
    )
}
export default PhoneIcon
