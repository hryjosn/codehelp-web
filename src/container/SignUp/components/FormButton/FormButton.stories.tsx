import type { Meta, StoryObj } from '@storybook/react'
import FormButton from './FormButton'
import { FormProvider, useForm } from 'react-hook-form'
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'SignUp/FormButton',
    component: FormButton,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    decorators: [
        (Story) => {
            const methods = useForm()
            return (
                <FormProvider {...methods}>
                    <Story />
                </FormProvider>
            )
        },
    ],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { children: 'SignUp' },
} satisfies Meta<typeof FormButton>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Default: Story = {
    args: { variant: 'default' },
}
export const NextButton: Story = {
    args: { children: 'Next', variant: 'nextButton' },
}
