import type { Meta, StoryObj } from '@storybook/nextjs'
import ImageRemoveButton from './ImageRemoveButton'

const meta = {
    title: 'ImageRemoveButton',
    component: ImageRemoveButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof ImageRemoveButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        onClick() {},
        children: '',
    },
}
