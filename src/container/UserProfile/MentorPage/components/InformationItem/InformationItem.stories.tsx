import type { Meta, StoryObj } from '@storybook/react'
import InformationItem from './InformationItem'
import { fn } from '@storybook/test'

const meta = {
    title: 'UserProfile/MentorPage/InformationItem',
    component: InformationItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        title: '',
        content: '',
        className: '',
    },
} satisfies Meta<typeof InformationItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: 'Question:',
        content: 'here is the question content',
        className: '',
    },
}
