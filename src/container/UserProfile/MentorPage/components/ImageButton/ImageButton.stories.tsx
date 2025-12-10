import type { Meta, StoryObj } from '@storybook/nextjs'
import ImageButton from './ImageButton'
import { fn } from 'storybook/test'

const meta = {
    title: 'UserProfile/MentorPage/ImageButton',
    component: ImageButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        className: '',
        src: '',
        onClick: fn(),
    },
} satisfies Meta<typeof ImageButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        className: '',
        src: 'https://codehelp-backend-production.up.railway.app/image/eb658587-7fa9-4880-a1a2-dfcd3d993102',
    },
}
