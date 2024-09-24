import type { Meta, StoryObj } from '@storybook/react'
import Booking from './Booking'

const meta = {
    title: 'MentorProfile/Components/Booking',
    component: Booking,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Booking>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
