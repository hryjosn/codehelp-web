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
        education: {
            degree: 'degree',
            major: 'major',
        },
    },
}
