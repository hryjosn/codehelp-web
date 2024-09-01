import type { Meta, StoryObj } from '@storybook/react'
import FormController from './FormController'
import { CustomForm } from './CustomForm'
import Joi from 'joi'

const meta = {
    title: 'SignUp/FormController',
    component: FormController,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <CustomForm
                onSubmit={() => {}}
                buttonText={'Sign Up'}
                schema={Joi.object({
                    UserName: Joi.string().required(),
                })}
            >
                <Story />
            </CustomForm>
        ),
    ],
    argTypes: {
        type: { control: 'select', options: ['text', 'password'] },
    },
} satisfies Meta<typeof FormController>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: 'UserName',
        placeholder: 'UserName',
    },
}

export const ValidationError: Story = {
    args: {
        label: 'UserName',
        placeholder: 'Please click button',
    },
}
