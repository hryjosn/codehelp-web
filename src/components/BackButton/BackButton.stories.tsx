import type { Meta, StoryObj } from '@storybook/nextjs'
import BackButton from './BackButton'

const meta = {
    title: 'BackButton',
    component: BackButton,
    parameters: {
        layout: 'centered',
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof BackButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
