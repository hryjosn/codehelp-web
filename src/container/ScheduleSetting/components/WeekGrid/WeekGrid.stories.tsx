import type { Meta, StoryObj } from '@storybook/react'
import WeekGrid from './WeekGrid'

const meta = {
    title: 'ScheduleSetting/Components/WeekGrid',
    component: WeekGrid,
    parameters: {
        layout: 'centered',
        args: { week: 'Mon' },
    },
} satisfies Meta<typeof WeekGrid>

export default meta
type Story = StoryObj<typeof meta>
const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const Default: Story = {
    args: { week: 'Mon' },
    render: () => {
        return (
            <div className="flex">
                {weeks.map((week, index) => (
                    <div key={index} className="w-20">
                        <WeekGrid week={week} />
                    </div>
                ))}
            </div>
        )
    },
}
