'use client'

import { addDays, format } from 'date-fns'
import React from 'react'
import { useGetBookingInfo } from '~/api/user/user'
import BookingInfoCard from './components/BookingInfoCard'

const upcoming7Days = Array.from({ length: 7 }, (_, i) => {
    return addDays(new Date(), i)
})
const BookingInfo = () => {
    const { data: BookingInfo } = useGetBookingInfo()
    return (
        <>
            <div className="mx-10 mt-10 overflow-x-auto md:mx-20">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="flex bg-gray-100">
                            {upcoming7Days.map((date, index) => (
                                <th key={index} className="flex-1 border p-2">
                                    {format(date, 'M/d (EEE)')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="flex">
                            {upcoming7Days.map((date, index) => {
                                const formattedDate = format(date, 'yyyy-MM-dd')
                                const bookingsForDay =
                                    BookingInfo?.bookingTime?.filter(
                                        (booking) =>
                                            format(
                                                new Date(booking.startAt),
                                                'yyyy-MM-dd'
                                            ) === formattedDate
                                    ) || []
                                return (
                                    <td
                                        key={index}
                                        className="flex-1 border p-2 align-top"
                                    >
                                        {bookingsForDay.length > 0 ? (
                                            bookingsForDay.map((data) => (
                                                <BookingInfoCard
                                                    key={index}
                                                    data={data}
                                                />
                                            ))
                                        ) : (
                                            <p className="text-center text-gray-500">
                                                No booking
                                            </p>
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default BookingInfo
