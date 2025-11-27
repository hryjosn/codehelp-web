import type { Meta, StoryObj } from '@storybook/nextjs'
import Experience from '.'

const meta = {
    title: 'MentorProfile/Components/Experience',
    component: Experience,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Experience>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        experiences: [
            {
                title: 'Experience Title',
                company: 'Company',
                description: 'Description',
            },
        ],
    },
}

export const Secondary: Story = {
    args: {
        experiences: [
            {
                title: 'First Experience Title',
                company: 'First Company',
                description: 'First Description',
            },
            {
                title: 'Second Experience Title',
                company: 'Second Company',
                description: 'Second Description',
            },
        ],
    },
}
