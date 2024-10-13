import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'
import Calendar from './Calendar'

const meta = {
    title: 'MentorProfile/Components/Booking/Components/Calendar',
    component: Calendar,
    parameters: {
        layout: 'centered',
    },
    args: {
        setSelectedDate: fn(),
        value: new Date(),
    },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        setSelectedDate: fn(),
        value: new Date(),
    },
}
