import type { Meta, StoryObj } from '@storybook/react'
import FormController from './FormController'
import { Form } from './Form'
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
            <Form
                onSubmit={() => {}}
                buttonText={'Sign Up'}
                schema={Joi.object({
                    UserName: Joi.string().required(),
                })}
            >
                <Story />
            </Form>
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
        label: 'userName',
        placeholder: 'UserName',
    },
}

export const ValidationError: Story = {
    args: {
        label: 'userName',
        placeholder: 'Please click button',
    },
}
