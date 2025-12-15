'use client'

import React, { useState } from 'react'
import ButtonGrid from './components/ButtonGrid/ButtonGrid'
import TimeZoneGrid from './components/TimeZoneGrid/TimeZoneGrid'
import WeekGrid from './components/WeekGrid/WeekGrid'
import HourGrid from './components/HourGrid/HourGrid'
import Header from '~/components/Header/Header'
import { AppointmentT, Days, SelectedItem } from './store/types'
import { Button } from '~/components/Button/Button'
import { useUpdateAvailableTime } from '~/api/mentor/mentor'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const TIMECODES = [...Array(48)]

const Appointment = () => {
    const [selectedItems, setSelectedItems] = useState<SelectedItem>({})
    const { mutate: saveAppointment } = useUpdateAvailableTime()

    const setting = (day: number, time: number) => {
        setSelectedItems((prevState) => {
            const newItems = { ...prevState }
            const key = `${day}-${time}`
            if (newItems[key]) {
                delete newItems[key]
            } else {
                newItems[key] = { day, time }
            }
            return newItems
        })
    }
    const reset = () => {
        const result = window.confirm(
            'Are you sure to reset appointment time？'
        )
        if (result) {
            setSelectedItems({})
        }
    }
    const save = () => {
        const selectedList = Object.values(selectedItems)
        let appointment: AppointmentT[] = []

        selectedList.forEach(({ day, time }) => {
            const matchedDay = appointment.find(
                (data) => data.day === Days[day]
            )

            if (matchedDay) {
                matchedDay.timeCode.push(time)
            } else {
                appointment.push({
                    day: Days[day],
                    timeCode: [time],
                })
            }
        })
        saveAppointment(
            { availableTimeList: appointment },
            {
                onSuccess(res) {
                    alert(res.message)
                },
            }
        )
    }

    return (
        <>
            <Header />
            <div className="flex justify-center gap-10 py-4">
                <table className="w-full max-w-5xl">
                    <thead>
                        <tr className="flex">
                            <TimeZoneGrid />
                            {DAYS.map((week, index) => (
                                <WeekGrid key={index} week={week} />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TIMECODES.map((_, rowIndex) => (
                            <tr key={rowIndex} className="flex">
                                <HourGrid hour={rowIndex} />
                                {DAYS.map((_, colIndex) => (
                                    <ButtonGrid
                                        key={colIndex}
                                        variant={
                                            selectedItems[
                                                `${colIndex + 1}-${rowIndex}`
                                            ]
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
                <div className="flex flex-col items-center gap-5 pt-4">
                    <p className="mb-5 text-3xl">
                        Select your availability Times
                    </p>
                    <Button className="min-w-40 max-w-80" onClick={reset}>
                        Reset All
                    </Button>
                    <Button className="min-w-40 max-w-80" onClick={save}>
                        Save
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Appointment
