'use client'

import { HiPhone } from 'react-icons/hi2'
import { useRouter } from '~/i18n/routing'
import LoadingModal from '~/components/LoadingModal/LoadingModal'
import { useState } from 'react'

const PhoneIcon = ({ mentorId }: { mentorId: string }) => {
    const router = useRouter()

    const [modalVisible, setModalVisible] = useState(false)
    return (
        <>
            <HiPhone
                className="cursor-pointer"
                size={30}
                onClick={async () => {
                    setModalVisible(true)
                    router.push(`/video-conference/${mentorId}`)
                    setModalVisible(false)
                }}
            />
            <LoadingModal visible={modalVisible} />
        </>
    )
}
export default PhoneIcon
