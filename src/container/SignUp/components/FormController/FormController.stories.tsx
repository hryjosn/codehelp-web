import type { Meta, StoryObj } from '@storybook/react'
import FormController from './FormController'
import { StorybookFormProvider } from './withRHF'
import Joi from 'joi'
import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

const meta = {
    title: 'SignUp/FormController',
    component: FormController,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <StorybookFormProvider
                onSubmit={() => {}}
                schema={Joi.object({
                    UserName: Joi.string().required(),
                })}
            >
                <Story />
            </StorybookFormProvider>
        ),
    ],
} satisfies Meta<typeof FormController>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        placeholder: 'UserName',
        label: 'UserName',
    },
}

export const ValidationError: Story = {
    args: {
        placeholder: 'Please click button',
        label: 'UserName',
    },
    decorators: [
        (Story) => {
            const methods = useForm({
                defaultValues: {
                    UserName: '',
                },
            })

            useEffect(() => {
                methods.setError('UserName', {
                    type: 'manual',
                    message: 'This field is required',
                })
            }, [methods])

            return (
                <FormProvider {...methods}>
                    <Story />
                </FormProvider>
            )
        },
    ],
}
