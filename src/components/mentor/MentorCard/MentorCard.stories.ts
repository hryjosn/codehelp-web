import type { Meta, StoryObj } from '@storybook/react'
import { MentorCard } from './MentorCard'
import { MOCK_MENTOR_LIST } from '~/container/Home/components/MentorList/constant'
const meta = {
    title: 'MentorProfile/MentorCard',
    component: MentorCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { mentor: MOCK_MENTOR_LIST[0] },
} satisfies Meta<typeof MentorCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { mentor: MOCK_MENTOR_LIST[0] },
}
