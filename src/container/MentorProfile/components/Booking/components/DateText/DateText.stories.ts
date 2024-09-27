import type { Meta, StoryObj } from '@storybook/react'

import { DateText } from './DateText'

const meta = {
    title: 'MentorProfile/Components/Booking/Components/DateText',
    component: DateText,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['primary', 'secondary'] },
    },
} satisfies Meta<typeof DateText>

const DATE = new Date()

export default meta
type Story = StoryObj<typeof meta>

export const Week: Story = {
    args: {
        children: DATE.toLocaleDateString('en-US', {
            weekday: 'short',
        }),
        variant: 'primary',
    },
}
export const Day: Story = {
    args: {
        children: DATE.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
        }),
        variant: 'secondary',
    },
}
