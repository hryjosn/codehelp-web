import type { Meta, StoryObj } from '@storybook/nextjs'
import ButtonInput from './ButtonInput'
import { TextareaHTMLAttributes, useState } from 'react'
import { TextareaAutosizeProps } from 'react-textarea-autosize'

const meta = {
    title: 'ButtonInput',
    component: ButtonInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { placeholder: 'Write something...', maxRows: 17 },
} satisfies Meta<typeof ButtonInput>

export default meta
type Story = StoryObj<typeof meta>

const ButtonInputWithHooks = (
    props: TextareaHTMLAttributes<HTMLTextAreaElement>
) => {
    const [inputValue, setInputValue] = useState('')
    return (
        <ButtonInput
            {...props}
            value={inputValue}
            onChange={(event) => {
                setInputValue(event.target.value)
            }}
            onClick={() => {
                setInputValue('')
            }}
        />
    )
}

export const Default: Story = {
    args: {
        value: '',
        placeholder: 'Write something...',
        onClick() {},
        onChange(e) {},
    },
    render: ButtonInputWithHooks,
}
