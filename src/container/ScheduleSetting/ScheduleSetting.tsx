'use client'

import React, { useState } from 'react'
import ButtonGrid from './components/ButtonGrid/ButtonGrid'
import TimeZoneGrid from './components/TimeZoneGrid/TimeZoneGrid'
import WeekGrid from './components/WeekGrid/WeekGrid'
import HourGrid from './components/HourGrid/HourGrid'
import Header from '~/components/Header/Header'
import { ScheduleT, weekly } from './store/types'
import { Button } from '~/components/Button/Button'
import { useGetUserInfo } from '~/api/user/user'
import { useSaveSchedule } from '~/api/mentor/mentor'
import { useRouter } from 'next/navigation'

const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const timeCode = [...Array(24)]

const ScheduleSetting = () => {
    const [schedule, setSchedule] = useState<ScheduleT[]>([])
    const router = useRouter()
    const { data: userData } = useGetUserInfo()
    const { mutate: saveSchedule } = useSaveSchedule()
    const setting = (week: number, hour: number) => {
        const weekName = weekly[week]

        setSchedule((prev) => {
            const findWeekIndex = prev.findIndex(
                (item) => item.weekly === weekName
            )

            if (findWeekIndex >= 0) {
                const existingHours = prev[findWeekIndex].timeCode
                const updatedHours = existingHours.includes(hour)
                    ? existingHours.filter((h) => h !== hour)
                    : [...existingHours, hour]

                const updatedWeek = {
                    ...prev[findWeekIndex],
                    timeCode: updatedHours,
                }

                return [
                    ...prev.slice(0, findWeekIndex),
                    updatedWeek,
                    ...prev.slice(findWeekIndex + 1),
                ]
            } else {
                return [...prev, { weekly: weekName, timeCode: [hour] }]
            }
        })
    }
    const resetSchedule = () => {
        setSchedule([])
    }
    const savingTimes = () => {
        saveSchedule(
            { data: schedule },
            {
                onSuccess(res) {
                    alert(res.message)
                },
            }
        )
    }

    if (userData && userData.identity !== 'mentor') {
        router.back()
    }
    return (
        <>
            <Header />
            <div className="flex justify-center gap-10 py-4">
                <table className="w-full max-w-5xl">
                    <thead>
                        <tr className="flex">
                            <TimeZoneGrid />
                            {weeks.map((week, index) => (
                                <WeekGrid key={index} week={week} />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeCode.map((_, rowIndex) => (
                            <tr key={rowIndex} className="flex">
                                <HourGrid hour={rowIndex} />
                                {weeks.map((_, colIndex) => (
                                    <ButtonGrid
                                        key={colIndex}
                                        variant={
                                            schedule.some(
                                                (value) =>
                                                    value.weekly ===
                                                        weekly[colIndex + 1] &&
                                                    value.timeCode.some(
                                                        (value) =>
                                                            value === rowIndex
                                                    )
                                            )
                                                ? 'primary'
                                                : 'secondary'
                                        }
                                        onClick={() => {
                                            setting(colIndex + 1, rowIndex)
                                        }}
                                    />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex flex-col items-center justify-center gap-5 pt-4">
                    <p className="mb-5 text-3xl">
                        Select your availability Times
                    </p>
                    <Button
                        className="min-w-40 max-w-80"
                        onClick={resetSchedule}
                    >
                        Reset All
                    </Button>
                    <Button className="min-w-40 max-w-80" onClick={savingTimes}>
                        Save
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ScheduleSetting
