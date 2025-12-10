import type { Meta, StoryObj } from '@storybook/nextjs'
import UploadImage from './UploadImage'

const meta = {
    title: 'UploadImage',
    component: UploadImage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof UploadImage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        onChange(event) {},
    },
}
