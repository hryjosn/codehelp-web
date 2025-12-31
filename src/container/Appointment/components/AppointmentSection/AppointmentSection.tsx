'use client'

import React, { use, useEffect } from 'react'
import ButtonGrid from '../ButtonGrid/ButtonGrid'
import TimeZoneGrid from '../TimeZoneGrid/TimeZoneGrid'
import WeekGrid from '../WeekGrid/WeekGrid'
import HourGrid from '../HourGrid/HourGrid'
import Header from '~/components/Header/Header'
import { Button } from '~/components/Button/Button'
import { useUpdateAvailableTime } from '~/api/mentor/mentor'
import { useAppointmentStore } from '~/container/Appointment/store/AppointmentStore'
import { Props } from './types'
import { useToast } from '~/hooks/use-toast'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const TIMECODES = [...Array(48)]

const AppointmentSection = ({ mentorAvailableTimes }: Props) => {
    const {
        selectedItems,
        select,
        reset,
        buildAppointmentList,
        initSelectedItems,
    } = useAppointmentStore()
    const { mutate: saveAppointment } = useUpdateAvailableTime()
    const { toast } = useToast()

    const onReset = () => {
        const result = window.confirm(
            'Are you sure to reset appointment time？'
        )
        if (result) {
            reset()
        }
    }
    const save = () => {
        const appointment = buildAppointmentList()
        saveAppointment(
            { availableTimeList: appointment },
            {
                onSuccess(res) {
                    toast({
                        title: 'Save successful',
                        variant: 'hint',
                    })
                },
            }
        )
    }

    useEffect(() => {
        initSelectedItems(mentorAvailableTimes || [])
    }, [mentorAvailableTimes])

    return (
        <>
            <Header />
            <div className="flex flex-col items-center gap-10 px-5 pb-10 pt-4">
                <div className="flex flex-col items-center gap-5 pt-4">
                    <p className="mb-5 text-3xl">
                        Select your availability Times
                    </p>
                    <div className="flex gap-4">
                        <Button
                            className="max-w-50 min-w-28 sm:min-w-40 sm:max-w-80"
                            onClick={onReset}
                        >
                            Reset All
                        </Button>
                        <Button
                            className="max-w-50 min-w-28 sm:min-w-40 sm:max-w-80"
                            onClick={save}
                        >
                            Save
                        </Button>
                    </div>
                </div>
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
                                            select(colIndex + 1, rowIndex)
                                        }}
                                    />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AppointmentSection
