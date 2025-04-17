import type { Meta, StoryObj } from '@storybook/react'
import AppointmentButton from './AppointmentButton'
import { fn } from '@storybook/test'

const meta = {
    title: 'UserProfile/MentorPage/AppointmentButton',
    component: AppointmentButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onClick: fn(),
    },
} satisfies Meta<typeof AppointmentButton>

export default meta
type Story = StoryObj<typeof meta>

const date = new Date()

export const Default: Story = {
    args: {
        bookingAt: date,
        duration: 90,
    },
}
