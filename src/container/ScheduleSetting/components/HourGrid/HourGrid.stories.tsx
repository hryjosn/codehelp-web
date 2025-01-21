import type { Meta, StoryObj } from '@storybook/react'
import HourGrid from './HourGrid'

const meta = {
    title: 'ScheduleSetting/Components/HourGrid',
    component: HourGrid,
    parameters: {
        layout: 'centered',
        args: { hour: 1 },
    },
} satisfies Meta<typeof HourGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { hour: 1 },
    render: () => {
        return (
            <div className="w-20">
                <HourGrid hour={1} />
                <HourGrid hour={2} />
                <HourGrid hour={3} />
            </div>
        )
    },
}
