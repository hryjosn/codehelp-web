import type { Meta, StoryObj } from '@storybook/react'
import AppointmentModal from './AppointmentModal'
import { useAppointmentModalStore } from './store/AppointmentModalStore'

const meta = {
    title: 'UserProfile/MentorPage/AppointmentModal',
    component: AppointmentModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        bookingId: '',
    },
    decorators: [
        (Story) => {
            useAppointmentModalStore.setState({
                isOpen: true,
            })
            return <Story />
        },
    ],
} satisfies Meta<typeof AppointmentModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        bookingId: '0d53042e-f179-49cf-bad0-9977adf15a9e',
    },
}
