import type { Meta, StoryObj } from '@storybook/react'
import Education from '.'

const meta = {
    title: 'MentorProfile/Components/Education',
    component: Education,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Education>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
       educationProps:'海事資訊科技系$%$高雄科技大學'
    },
}
