import type { Meta, StoryObj } from '@storybook/react'
import PhoneNumberInput from './PhoneNumberInput'

const meta = {
    title: 'UserProfile/PhoneNumberInput',
    component: PhoneNumberInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        initialCountry: 'tw',
        phoneNumber: '+8860912234442',
    },
} satisfies Meta<typeof PhoneNumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        initialCountry: 'tw',
        phoneNumber: '+886912234442',
    },
}
