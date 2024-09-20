import type { Meta, StoryObj } from '@storybook/react'
import LinkText from './LinkText'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'SignUp/LinkText',
    component: LinkText,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    tags: ['autodocs'],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    args: {
        children: 'Login',
        href: '/login',
    },
    argTypes: {
        variant: { control: 'select', options: ['default', 'underline'] },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof LinkText>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default: Story = {
    args: { variant: 'default' },
}
export const Underline: Story = {
    args: { variant: 'underline' },
}
