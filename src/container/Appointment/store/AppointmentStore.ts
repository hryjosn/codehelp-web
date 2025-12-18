import { create } from 'zustand'
import { AppointmentT, Days, SelectedItem } from './types'
import { MentorAvailableTimes } from '~/api/mentor/types'

type State = {
    selectedItems: SelectedItem
}

type Action = {
    select: (day: number, time: number) => void
    reset: () => void
    buildAppointmentList: () => AppointmentT[]
    initSelectedItems: (data: MentorAvailableTimes[]) => void
}

export const useAppointmentStore = create<State & Action>((set, get) => ({
    selectedItems: {},

    select: (day, time) => {
        set((state) => {
            const key = `${day}-${time}`
            const newItems = { ...state.selectedItems }

            if (newItems[key]) {
                delete newItems[key]
            } else {
                newItems[key] = { day, time }
            }

            return { selectedItems: newItems }
        })
    },

    reset: () => set({ selectedItems: {} }),

    buildAppointmentList: () => {
        const selectedList = Object.values(get().selectedItems)
        const appointment: AppointmentT[] = []

        selectedList.forEach(({ day, time }) => {
            const dayLabel = Days[day]
            const matchedDay = appointment.find((item) => item.day === dayLabel)

            if (matchedDay) {
                matchedDay.timeCode.push(time)
            } else {
                appointment.push({
                    day: dayLabel,
                    timeCode: [time],
                })
            }
        })

        return appointment
    },

    initSelectedItems: (data) => {
        const items: SelectedItem = {}

        data.forEach(({ day, timeCode }) => {
            const dayIndex = Days[day]

            if (dayIndex === undefined) return

            timeCode.forEach((time) => {
                const key = `${dayIndex}-${time}`
                items[key] = {
                    day: dayIndex,
                    time,
                }
            })
        })

        set({ selectedItems: items })
    },
}))
