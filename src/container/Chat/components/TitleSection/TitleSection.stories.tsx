import type { Meta, StoryObj } from '@storybook/react'
import TitleSection from './TitleSection'

const meta = {
    title: 'Chat/TitleSection',
    component: TitleSection,
    parameters: {
        layout: 'centered',
        nextjs: {
            appDirectory: true,
        },
    },
    args: {},
    tags: ['autodocs'],
} satisfies Meta<typeof TitleSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
}
