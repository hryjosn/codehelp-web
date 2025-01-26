'use client'

import React from 'react'

const TimeZoneGrid = () => {
    return (
        <th className="flex max-w-40 flex-1 justify-center border bg-gray-100 py-4">
            {'GMT' + new Date().getTimezoneOffset() / 60}
        </th>
    )
}

export default TimeZoneGrid
