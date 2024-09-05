import type { Meta, StoryObj } from '@storybook/react'
import MentorProfile from '.'

const meta = {
    title: 'MentorProfile/MentorProfile',
    component: MentorProfile,
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            appDirectory: true,
        },
    },
} satisfies Meta<typeof MentorProfile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { params: { id: '1' } } }
