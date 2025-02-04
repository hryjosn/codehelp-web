'use client'
import { useRouter } from 'next/navigation'

import Bio from '~/components/mentor/Bio'
import Education from '~/components/mentor/Education'
import Experience from '~/components/mentor/Experience'
import Booking from './components/Booking/Booking'
import { runInAction } from 'mobx'
import rootStore from '~/store'
import { useState } from 'react'
import { HiPhone, HiChatBubbleLeftEllipsis } from 'react-icons/hi2'
import { BsLinkedin } from 'react-icons/bs'
import { createLocalStream } from '../VideoConference/utils'
import LoadingModal from '~/components/LoadingModal/LoadingModal'
import { observer } from 'mobx-react-lite'
import { useGetMentorInfo } from '~/api/mentor/mentor'
import React from 'react'
import { useChatroomStore } from '../Chat/store/ChatStore'
import { RESPONSE_CODE } from '../Login/store/types'
import Link from 'next/link'
import { BackgroundItem } from './components/BackgroundItem/BackgroundItem'
import Header from '~/components/Header/Header'

const MentorProfile = ({ params }: { params: { id: string } }) => {
    const {
        videoConferenceStore: { connectSocket },
        homeStore: { isAuth },
    } = rootStore

    const [modalVisible, setModalVisible] = useState(false)

    const router = useRouter()
    const { data: MentorInfo, isPending } = useGetMentorInfo(params.id)
    const createChatroom = useChatroomStore((state) => state.createChatroom)

    if (isPending) {
        return
    }
    if (!MentorInfo) {
        return <h1>Error: Mentor information not found</h1>
    }
    return (
        <>
            <Header />
            <div className="p-6 md:p-16">
                <Bio
                    avatar={MentorInfo.avatar}
                    name={MentorInfo.userName}
                    company={MentorInfo.company}
                    title={MentorInfo.title}
                    country={MentorInfo.country}
                />
                <div className="flex justify-end gap-5">
                    <HiChatBubbleLeftEllipsis
                        className="cursor-pointer"
                        size={30}
                        onClick={async () => {
                            const res = await createChatroom(params.id)
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
                <div className="mt-6 flex flex-col items-start gap-4 border-t border-solid border-gray-200 pt-6 lg:flex-row lg:gap-32">
                    <div className="flex flex-1 flex-col gap-4 px-6">
                        <p className="line-clamp-3 font-bold">
                            {MentorInfo!.introduction}
                        </p>
                        <div>
                            <Link
                                href={MentorInfo.url}
                                target="_blank"
                                className="inline-flex"
                            >
                                <BsLinkedin
                                    size={'25'}
                                    className="text-blue-600"
                                />
                            </Link>
                        </div>
                        <p className="text-lg font-bold">Background</p>
                        <div className="rounded-xl border border-solid border-gray-200 px-5 py-2">
                            <BackgroundItem
                                title={'Expertise'}
                                content={[
                                    MentorInfo.primaryExpertise,
                                    MentorInfo.secondaryExpertise,
                                    MentorInfo.tertiaryExpertise,
                                ]}
                            />
                            <BackgroundItem
                                title={'Disciplines'}
                                content={MentorInfo.disciplines}
                            />
                        </div>
                        {MentorInfo.experience.length > 0 && (
                            <Experience experiences={MentorInfo.experience} />
                        )}

                        <Education educationProps={MentorInfo.education} />
                    </div>
                    <div className="px-6 lg:px-0">
                        <Booking mentorId={MentorInfo.id} />
                    </div>
                </div>
            </div>
            <LoadingModal visible={modalVisible} />
        </>
    )
}

export default observer(MentorProfile)
