import type { Meta, StoryObj } from '@storybook/nextjs'
import FormInput, { FormInputProps } from './FormInput'
import { FormProvider, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi/lib'

const meta: Meta<FormInputProps> = {
    title: 'Login/FormInput',
    component: FormInput,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => {
            const schema = Joi.object({
                email: Joi.string()
                    .email({ tlds: { allow: false } })
                    .required(),
                password: Joi.string().min(8).max(30).required(),
            }).messages({
                'any.required': 'is a required field',
            })
            const methods = useForm({
                mode: 'onChange',
                resolver: joiResolver(schema),
                defaultValues: {
                    email: '',
                    password: '',
                },
            })

            return (
                <FormProvider {...methods}>
                    <Story />
                </FormProvider>
            )
        },
    ],
    tags: ['autodocs'],
    args: {
        title: 'E-mail',
        valueName: 'email',
    },
}

export default meta

type Story = StoryObj<FormInputProps>

export const Default: Story = {
    args: {
        title: 'E-mail',
        valueName: 'email',
    },
}

export const Password: Story = {
    args: {
        title: 'Password',
        valueName: 'password',
        type: 'password',
    },
}
