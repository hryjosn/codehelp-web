'use client'

import React from 'react'

interface WeekGridT {
    week: string
}
const WeekGrid = ({ week }: WeekGridT) => {
    return (
        <th className="flex max-w-40 flex-1 justify-center border bg-gray-100 py-4">
            {week}
        </th>
    )
}

export default WeekGrid
