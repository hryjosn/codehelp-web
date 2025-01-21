'use client'

import React from 'react'

interface HourGrid {
    hour: number
}
const HourGrid = ({ hour }: HourGrid) => {
    return (
        <td className="flex max-w-40 flex-1 justify-center border bg-gray-50">
            <p className="self-center">{hour + ':00'}</p>
        </td>
    )
}

export default HourGrid
