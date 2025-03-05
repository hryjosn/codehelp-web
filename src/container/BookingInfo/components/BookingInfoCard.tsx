'use client'

import { useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import EditBookingModal from './EditBookingInfoModal/EditBookingInfoModal'
import { useEditBookingInfoModalStore } from './EditBookingInfoModal/store/EditBookingInfoModalStore'

interface BookingInfoCardProps {
    data: { topic: string; host: string; startAt: string; memberList: string[] }
}

const BookingInfoCard = ({ data }: BookingInfoCardProps) => {
    const [isHover, setIsHover] = useState(false)
    const { topic, host, startAt, memberList } = data
    const { isOpen, openModal } = useEditBookingInfoModalStore()
    return (
        <div
            className="relative mb-2 rounded-md bg-lime-100 p-4 transition duration-200"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {isHover && (
                <button
                    className="absolute right-2 top-2 flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                    onClick={openModal}
                >
                    <FiEdit className="h-4 w-4" />
                    <span className="text-sm">Edit</span>
                </button>
            )}

            <div>
                <span className="font-black">Topic:</span> {topic}
            </div>
            <div>
                <span className="font-black">Host: </span>
                {host}
            </div>
            <div>
                <span className="font-black">Start Time: </span>
                {new Date(startAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </div>
            <div>
                <span className="font-black">Member: </span>
                {memberList.join(', ')}
            </div>
            {isOpen && <EditBookingModal data={data}></EditBookingModal>}
        </div>
    )
}

export default BookingInfoCard
