import type { Meta, StoryObj } from '@storybook/react'
import FormInput, { FormInputProps } from './FormInput'
import { useForm } from 'react-hook-form'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

const meta = {
    title: 'SignUp/FormInput',
    component: FormInput,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],

    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { type: 'text' },
    argTypes: {
        type: { control: 'select', options: ['text', 'password'] },
    },
} satisfies Meta<typeof FormInput>

export default meta

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
const Template = (args: FormInputProps) => {
    const { register } = useForm()
    return <FormInput {...args} register={register} />
}

export const Default: StoryObj<FormInputProps> = {
    render: Template,
    args: {
        value: 'Default text',
        placeholder: 'UserName',
        registerName: 'UserName',
    },
}
export const Password: StoryObj<FormInputProps> = {
    render: Template,
    args: {
        value: 'Default text',
        placeholder: 'UserName',
        registerName: 'UserName',
        type: 'password',
    },
}
