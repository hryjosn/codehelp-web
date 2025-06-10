'use client'

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Modal } from '@mui/material'
import Image from 'next/image'
import { useGetMentorInfo } from '~/api/mentor/mentor'
import ImageRemoveButton from '~/components/ImageRemoveButton/ImageRemoveButton'
import Input from '~/components/Input/Input'
import UploadImage from '~/components/UploadImage/UploadImage'
import { useStore } from '~/store/rootStoreProvider'
import { Props } from './types'
import { useNewBooking } from '~/api/booking/booking'
import { useState } from 'react'
import Selector from '~/components/Selector/Selector'
import { durationList } from './constants'
import { useSession } from 'next-auth/react'
import { useToast } from '~/hooks/use-toast'
import { convertTimeCode } from '~/container/MentorProfile/components/Booking/utils'
import BookingButton from '../BookingButton/BookingButton'

const BookingModal = ({
    mentorId,
    selectedDate,
    selectedTimeCode,
    isOpen,
    onClose,
}: Props) => {
    const {
        bookingStore: { imageList, uploadImage, removeImage },
    } = useStore()
    const { data } = useGetMentorInfo(mentorId)
    const { mutate: newBooking } = useNewBooking()
    const { data: userData } = useSession()
    const { toast } = useToast()

    const [topic, setTopic] = useState('')
    const [question, setQuestion] = useState('')
    const [duration, setDuration] = useState('')

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const formatSelectedDate = new Intl.DateTimeFormat('zh-TW', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timeZone,
    }).format(selectedDate)

    const confirmBooking = () => {
        const formData = new FormData()

        const bookingTime = `${formatSelectedDate} ${convertTimeCode(selectedTimeCode)}`

        if (userData?.user?.id) {
            formData.append('topic', topic)
            formData.append('question', question)
            formData.append('duration', duration)
            formData.append('picture', imageList[0])
            formData.append('picture', imageList[1] || '')
            formData.append('picture', imageList[2] || '')
            formData.append('bookingTime', bookingTime)
            formData.append('memberIds', userData.user.id)
            newBooking(
                { data: formData, mentorId },
                {
                    onSuccess(res) {
                        if (res?.data?.booking) {
                            toast({
                                title: 'Booking successful',
                                variant: 'hint',
                            })
                        }
                    },
                }
            )
        }
        onClose()
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            className="flex items-center justify-center"
        >
            <div className="relative flex gap-5 rounded-lg bg-white p-7 shadow-xl">
                <div className="flex flex-col gap-3 p-5">
                    <div className="flex items-center gap-3">
                        <Image
                            src={data?.avatar || '/Login/User.png'}
                            width={0}
                            height={0}
                            sizes="100%"
                            className="h-12 w-12 rounded-full"
                            alt="avatar"
                        />
                        <div className="flex flex-col">
                            <p className="text-sm">{data?.userName}</p>
                            <p className="text-sm text-zinc-500">
                                {data?.title}
                            </p>
                        </div>
                    </div>
                    <hr className="h-1" />
                    <div className="flex flex-col gap-2 font-bold">
                        <h2>Mentorship Session</h2>
                        <small className="text-zinc-400 after:ml-0.5 after:text-red-500 after:content-['*']">
                            Session duration (min)
                        </small>
                        <Selector
                            label="Duration"
                            value={String(duration)}
                            dataList={durationList}
                            onChange={(value) => {
                                setDuration(value)
                            }}
                        />
                        <small className="text-zinc-400">About</small>
                        <p className="text-sm">Mentorship session</p>
                    </div>
                </div>
                <hr className="h-auto border-r" />
                <div className="flex-1">
                    <h2 className="mb-4 text-lg font-black">
                        Confirm your booking
                    </h2>
                    <div className="flex gap-10 text-base">
                        <div className="flex gap-2">
                            <CalendarMonthIcon />
                            {selectedDate.toLocaleString('en-US', {
                                weekday: 'short',
                            })}
                            , &nbsp;
                            {selectedDate.toLocaleString('en-US', {
                                day: '2-digit',
                                month: 'short',
                            })}
                        </div>
                        <div className="flex gap-2">
                            <AccessTimeIcon />
                            {convertTimeCode(selectedTimeCode)}
                        </div>
                    </div>

                    <div>
                        <p className="mb-2 mt-4 after:ml-0.5 after:text-red-500 after:content-['*']">
                            What is the topic you want to ask?
                        </p>
                        <Input
                            onChange={(e) => {
                                setTopic(e.target.value)
                            }}
                        />
                        <p className="mb-2 mt-4 after:ml-0.5 after:text-red-500 after:content-['*']">
                            What is the question you want to ask?
                        </p>
                        <textarea
                            className="w-full resize-none rounded-lg border border-zinc-300 p-2 outline-none focus:border-sky-600"
                            rows={5}
                            onChange={(e) => {
                                setQuestion(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mt-2">
                        {imageList.length < 3 && (
                            <div className="flex items-center">
                                <UploadImage
                                    onChange={(event) => {
                                        const file = event.target.files![0]
                                        if (!file.type.startsWith('image/')) {
                                            alert('Only can upload image files')
                                            return
                                        }
                                        const fileURL =
                                            URL.createObjectURL(file)
                                        uploadImage(fileURL)
                                    }}
                                />
                                <p className="ml-2">Press to add pictures</p>
                            </div>
                        )}

                        <div className="mt-1 flex">
                            {imageList.map((image, index) => (
                                <div className="mr-3" key={index}>
                                    <ImageRemoveButton
                                        onClick={() => {
                                            removeImage(image)
                                        }}
                                    >
                                        <Image
                                            src={image}
                                            alt=""
                                            width={100}
                                            height={100}
                                        />
                                    </ImageRemoveButton>
                                </div>
                            ))}
                        </div>
                    </div>
                    <BookingButton
                        isDisable={!topic || !question || !duration}
                        onClick={confirmBooking}
                        title="Confirm Booking"
                    />
                </div>
            </div>
        </Modal>
    )
}

export default BookingModal
