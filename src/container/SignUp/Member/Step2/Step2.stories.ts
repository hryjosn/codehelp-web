import type { Meta, StoryObj } from '@storybook/react'
import Step2 from './Step2'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'SignUp/Member/Step2',
    component: Step2,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
        nextjs: {
            // 👇 As in the Next.js application, next/navigation only works using App Router
            appDirectory: true,
        },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Step2>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default: Story = {}