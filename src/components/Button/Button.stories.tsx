import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button } from './Button'
import { fn } from 'storybook/test'

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['primary', 'secondary'] },
        size: { control: 'select', options: ['default'] },
    },
    args: {
        onClick: fn(),
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'Button',
        variant: 'primary',
        size: 'default',
    },
}
