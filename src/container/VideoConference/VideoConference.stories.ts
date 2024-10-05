import type { Meta, StoryObj } from '@storybook/react'
import VideoConference from '.'

const meta = {
    title: 'VideoConference/VideoConference',
    component: VideoConference,
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            appDirectory: true,
        },
    },
} satisfies Meta<typeof VideoConference>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
