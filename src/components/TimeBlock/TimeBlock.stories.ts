import type { Meta, StoryObj } from '@storybook/react'
import TimeBlock from './TimeBlock'
import { fn } from '@storybook/test'

const meta = {
    title: 'Components/TimeBlock',
    component: TimeBlock,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onClick: fn(),
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['idle', 'booked', 'notAvailable'],
        },
        selected: {
            control: 'select',
            options: [false, true],
        },
    },
} satisfies Meta<typeof TimeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        time: '2024-07-16T07:00:00+02:00',
        selected: true,
        variant: 'idle',
    },
}
export const Booked: Story = {
    args: {
        time: '2024-07-16T07:00:00+02:00',
        selected: true,
        variant: 'booked',
    },
}
export const NotAvailable: Story = {
    args: {
        time: '2024-07-16T07:00:00+02:00',
        selected: true,
        variant: 'notAvailable',
    },
}
