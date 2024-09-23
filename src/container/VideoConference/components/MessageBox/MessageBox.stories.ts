import type { Meta, StoryObj } from '@storybook/react'
import MessageBox from '.'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'VideoConference/MessageBox',
    component: MessageBox,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { name: 'user1', time: '1:00 pm', message: 'hello' },
} satisfies Meta<typeof MessageBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
