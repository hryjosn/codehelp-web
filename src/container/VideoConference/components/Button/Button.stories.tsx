import type { Meta, StoryObj } from '@storybook/react'
import Button from './index'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'VideoConference/Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],

    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { src: '/VideoConference/microphone.png', variant: 'default' },
    argTypes: {
        variant: { control: 'select', options: ['default', 'red'] },
        src: {
            control: 'select',
            options: [
                '/VideoConference/microphone.png',
                '/VideoConference/share_screen.png',
                '/VideoConference/chat.png',
                '/VideoConference/hang_up.png',
            ],
        },
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const RedBackground: Story = {
    args: { src: '/VideoConference/mute.png', variant: 'red' },
}
