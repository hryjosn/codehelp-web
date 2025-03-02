import type { Meta, StoryObj } from '@storybook/react'
import SkeletonCard from './SkeletonCard'

const meta = {
    title: 'Home/SkeletonCard',
    component: SkeletonCard,
    parameters: {
        layout: 'centered',
    },
    args: {},
} satisfies Meta<typeof SkeletonCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: () => {
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        )
    },
}
