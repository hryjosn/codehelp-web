'use client'
import { Modal } from '@mui/material'
import { useGetBookingRecord } from '~/api/booking/booking'
import { Props } from './types'
import { useAppointmentModalStore } from './store/AppointmentModalStore'
import { useImageModalStore } from '../ImageModal/store/AppointmentModalStore'
import { adjustMinuteToHour, adjustTimeZone } from '../../utils'
import { useTranslations } from 'next-intl'
import InformationItem from '../InformationItem/InformationItem'
import LoadAnimation from '~/../public/Lottie/loading.json'
import Lottie from 'lottie-react'
import ImageButton from '../ImageButton/ImageButton'

const AppointmentModal = ({ bookingId }: Props) => {
    const { data: bookingRecordData, isLoading } =
        useGetBookingRecord(bookingId)
    const { isOpen, closeModal } = useAppointmentModalStore()
    const { setImageURL, openModal } = useImageModalStore()
    const timeTranslate = useTranslations('Time')

    return (
        <Modal open={isOpen} onClose={closeModal}>
            <>
                {!isLoading && bookingRecordData ? (
                    <div className="absolute left-1/2 top-1/2 max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-8 py-10 shadow-lg">
                        <div className="flex border-b-2 pb-2 text-lg font-bold">
                            Topic:
                            <p className="ml-3">{bookingRecordData?.topic}</p>
                        </div>
                        <div className="mt-2 justify-center justify-between space-y-3 text-sm">
                            <InformationItem
                                title="Member: "
                                content={bookingRecordData?.memberList.map(
                                    (data) => (
                                        <p key={data.id}>
                                            {data.member.userName}
                                        </p>
                                    )
                                )}
                            />
                            <InformationItem
                                title="At:"
                                content={adjustTimeZone(
                                    bookingRecordData!.bookingAt
                                )}
                            />
                            <InformationItem
                                title="Duration:"
                                content={adjustMinuteToHour({
                                    minute: bookingRecordData!.duration,
                                    t: timeTranslate,
                                })}
                            />
                            <InformationItem
                                className="flex-col"
                                title="Question:"
                                content={bookingRecordData?.question}
                            />
                            {bookingRecordData?.picture.length > 0 && (
                                <InformationItem
                                    className="flex-col"
                                    title="Pictures:"
                                    content={
                                        <div className="flex space-x-2">
                                            {bookingRecordData?.picture.map(
                                                (src, index) => (
                                                    <ImageButton
                                                        key={index}
                                                        src={src}
                                                        onClick={() => {
                                                            setImageURL(src)
                                                            openModal()
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>
                                    }
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <Lottie
                        animationData={LoadAnimation}
                        className="absolute left-1/2 top-1/2 -my-3 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
                    />
                )}
            </>
        </Modal>
    )
}

export default AppointmentModal
