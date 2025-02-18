'use client'

import React from 'react'
import { useGetBookingInfo } from '~/api/user/user'

import Header from '~/components/Header/Header'

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const BookingInfo = () => {
    const { data: BookingInfo } = useGetBookingInfo()

    const today = new Date()
    const upcoming7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        return date
    })

    return (
        <>
            <Header />
            <div className="mx-10 mt-10 overflow-x-auto md:mx-20">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            {upcoming7Days.map((date, index) => (
                                <th key={index} className="w-1/7 border p-2">
                                    {`${date.getMonth() + 1}/${date.getDate()} (${WEEK_DAYS[date.getDay()]})`}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {upcoming7Days.map((date, index) => {
                                const formattedDate = date
                                    .toISOString()
                                    .split('T')[0]
                                const bookingsForDay =
                                    BookingInfo?.bookingTime?.filter(
                                        (booking) =>
                                            new Date(booking.startAt)
                                                .toISOString()
                                                .split('T')[0] === formattedDate
                                    ) || []
                                return (
                                    <td
                                        key={index}
                                        className="w-1/7 border p-2 align-top"
                                    >
                                        {bookingsForDay.length > 0 ? (
                                            bookingsForDay.map(
                                                ({
                                                    id,
                                                    topic,
                                                    host,
                                                    startAt,
                                                    memberList,
                                                }) => (
                                                    <div
                                                        key={id}
                                                        className="mb-2 rounded-md bg-lime-100 p-2"
                                                    >
                                                        <div>
                                                            <span className="font-black">
                                                                Topic:
                                                            </span>{' '}
                                                            {topic}
                                                        </div>
                                                        <div>
                                                            <span className="font-black">
                                                                Host:{' '}
                                                            </span>
                                                            {host}
                                                        </div>
                                                        <div>
                                                            <span className="font-black">
                                                                Start Time:{' '}
                                                            </span>
                                                            {new Date(
                                                                startAt
                                                            ).toLocaleTimeString(
                                                                'en-US',
                                                                {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                }
                                                            )}
                                                        </div>
                                                        <div>
                                                            <span className="font-black">
                                                                Member:{' '}
                                                            </span>
                                                            {memberList.join(
                                                                ', '
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )
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
