import type { Meta, StoryObj } from '@storybook/nextjs'
import Selector from './Selector'
import { useState } from 'react'
import { durationList } from '~/container/MentorProfile/components/Booking/components/BookingModal/constants'

const meta = {
    title: 'Components/Selector',
    component: Selector,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Selector>

export default meta
type Story = StoryObj<typeof meta>

const SelectorWithHooks = () => {
    const [duration, setDuration] = useState('30')
    return (
        <div className="w-40">
            <Selector
                label="Duration"
                value={duration}
                dataList={durationList}
                onChange={(value) => {
                    setDuration(value)
                }}
            />
        </div>
    )
}

export const Default: Story = {
    args: {
        label: '',
        value: '',
        dataList: [],
        onChange(e) {},
    },
    render: SelectorWithHooks,
}
