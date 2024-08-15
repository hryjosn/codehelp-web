import type { Meta, StoryObj } from '@storybook/react'
import InputController from './InputController'
import { FormProvider, useForm } from 'react-hook-form'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'SignUp/InputController',
    component: InputController,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <FormProvider {...useForm()}>
                <Story />
            </FormProvider>
        ),
    ],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { placeholder: '' },
} satisfies Meta<typeof InputController>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default: Story = {
    args: {
        placeholder: '',
        label: '',
        name: '',
        control: {},
    },
}
