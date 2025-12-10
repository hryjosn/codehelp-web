import type { Meta, StoryObj } from '@storybook/nextjs'
import BookingButton from './BookingButton'

const meta = {
    title: 'MentorProfile/Components/Booking/Components/BookingButton',
    component: BookingButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { isDisable: true },
} satisfies Meta<typeof BookingButton>

export default meta
type Story = StoryObj<typeof meta>

export const Disable: Story = {
    args: { title: 'BOOK', isDisable: true, onClick: () => {} },
}

export const Enable: Story = {
    args: { title: 'BOOK', isDisable: false, onClick: () => {} },
}
