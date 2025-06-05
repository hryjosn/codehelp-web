'use client'

import React from 'react'

interface HourGrid {
    hour: number
}
const HourGrid = ({ hour }: HourGrid) => {
    const hourNumber = String(Math.floor(hour / 2)).padStart(2, '0')
    const minuteNumber = `${hour % 2 === 0 ? ':00' : ':30'}`
    return (
        <td className="flex max-w-40 flex-1 justify-center border bg-gray-50">
            <p className="self-center">{hourNumber + minuteNumber}</p>
        </td>
    )
}

export default HourGrid
