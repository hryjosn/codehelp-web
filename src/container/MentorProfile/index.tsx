'use client'
import { useRouter } from 'next/navigation'

import Bio from '~/components/mentor/Bio'
import Education from '~/components/mentor/Education'
import Experience from '~/components/mentor/Experience'
import { MOCK_MENTOR_LIST } from '~/container/Home/components/MentorList/constant'
import type { Mentor } from '~/container/Home/components/MentorList/types'
import Booking from './components/Booking/Booking'
import { runInAction } from 'mobx'
import rootStore from '~/store'
import { useState } from 'react'
import { HiPhone, HiChatBubbleLeftEllipsis } from 'react-icons/hi2'
import { createLocalStream } from '../VideoConference/utils'
import LoadingModal from '~/components/LoadingModal/LoadingModal'
import { observer } from 'mobx-react-lite'
import { useGetMentorInfo } from '~/api/mentor'
import React from 'react'
import { useChatroomStore } from '../Chat/store/ChatStore'
import { RESPONSE_CODE } from '../Login/store/types'
const MentorProfile = ({ params }: { params: { id: string } }) => {
    const {
        videoConferenceStore: { connectSocket },
    } = rootStore
    const currentMentor: Mentor | undefined = MOCK_MENTOR_LIST.find(
        (mentor) => mentor.id === params.id
    )
    const [modalVisible, setModalVisible] = useState(false)

    const router = useRouter()
    const { data, isPending } = useGetMentorInfo(
        '0415338d-95be-4977-8b2a-74029e64ca25'
    ) // temporary
    const createChatroom = useChatroomStore((state) => state.createChatroom)
    if (!currentMentor) {
        router.back()
        return
    }
    if (isPending) {
        return
    }

    return (
        <>
            <div className="p-6 md:p-16">
                <Bio
                    avatar={currentMentor.avatar}
                    name={currentMentor.name}
                    company={currentMentor.company}
                    title={currentMentor.title}
                />
                <div className="flex justify-end gap-5">
                    <HiChatBubbleLeftEllipsis
                        className="cursor-pointer"
                        size={30}
                        onClick={async () => {
                            const res = await createChatroom(
                                '66598522-1162-4a7c-9273-ca2f2b25767a'
                            )
                            if (
                                res === RESPONSE_CODE.DATA_DUPLICATE ||
                                res.chatroomId
                            ) {
                                router.push('/chat')
                            }
                        }}
                    />
                    <HiPhone
                        className="cursor-pointer"
                        size={30}
                        onClick={async () => {
                            setModalVisible(true)
                            const localStream = await createLocalStream()
                            connectSocket()
                            runInAction(() => {
                                rootStore.videoConferenceStore.localStream =
                                    localStream
                            })
                            if (localStream) {
                                router.push(`/video-conference/${params.id}`)
                                setModalVisible(false)
                            }
                        }}
                    />
                </div>
                <div className="mt-6 flex flex-col items-center gap-6 border-t border-solid border-gray-200 pt-6 md:flex-row md:gap-32">
                    <div className="flex flex-1 flex-col gap-4 p-6">
                        <p className="line-clamp-3">{currentMentor.bio}</p>
                        <Experience experiences={currentMentor.experience} />
                        <Education education={currentMentor.education} />
                    </div>
                    <Booking mentorId={data.id} />
                </div>
            </div>
            <LoadingModal visible={modalVisible} />
        </>
    )
}

export default observer(MentorProfile)
