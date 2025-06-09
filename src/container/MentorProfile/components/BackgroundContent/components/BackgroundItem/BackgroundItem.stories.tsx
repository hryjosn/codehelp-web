import type { Meta, StoryObj } from '@storybook/react'
import BackgroundItem from './BackgroundItem'

const meta = {
    title: 'MentorProfile/Components/BackgroundContent/Components/BackgroundItem',
    component: BackgroundItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof BackgroundItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        data: 'Backend Development',
    },
    render: () => {
        return <BackgroundItem data={'Expertise'} />
    },
}
