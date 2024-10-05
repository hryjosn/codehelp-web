import type { Meta, StoryObj } from '@storybook/react'
import SelectButton from './SelectButton'
import { fn } from '@storybook/test'
import { DateText } from '../DateText/DateText'
import { useState } from 'react'

const meta = {
    title: 'MentorProfile/Components/Booking/Components/SelectButton',
    component: SelectButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['primary', 'secondary'] },
    },
} satisfies Meta<typeof SelectButton>

const DATE = new Date()

export default meta
type Story = StoryObj<typeof meta>

export const Day: Story = {
    args: {
        variant: 'primary',
    },
    render: (args) => {
        const [selectedDate, setSelectedDate] = useState<Date | null>(null)
        return (
            <SelectButton
                onClick={() => {
                    if (selectedDate === DATE) {
                        setSelectedDate(null)
                    } else {
                        setSelectedDate(DATE)
                    }
                }}
                className={`${selectedDate === DATE && 'border-sky-900'}`}
                {...args}
            >
                <DateText variant={'primary'}>
                    {DATE.toLocaleDateString('en-US', {
                        weekday: 'short',
                    })}
                </DateText>
                <DateText variant={'secondary'}>
                    {DATE.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                    })}
                </DateText>
            </SelectButton>
        )
    },
}

export const Time: Story = {
    args: {
        variant: 'secondary',
    },
    render: (args) => {
        const [selectedTime, setSelectedTime] = useState<Date | null>(null)
        return (
            <SelectButton
                onClick={() => {
                    if (selectedTime === DATE) {
                        setSelectedTime(null)
                    } else {
                        setSelectedTime(DATE)
                    }
                }}
                className={`${selectedTime === DATE && 'border-sky-900'}`}
                {...args}
            >
                {DATE.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                })}
            </SelectButton>
        )
    },
}
