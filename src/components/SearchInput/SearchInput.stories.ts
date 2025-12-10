import type { Meta, StoryObj } from '@storybook/nextjs'
import SearchInput from './SearchInput'

const meta = {
    title: 'SearchInput',
    component: SearchInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { placeholder: 'Search members' },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        value: '',
        placeholder: 'Search members',
        onChange(e) {},
        onSubmit() {},
    },
}
