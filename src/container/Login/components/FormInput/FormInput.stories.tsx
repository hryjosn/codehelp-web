import type { Meta, StoryFn } from '@storybook/react'
import FormInput from './FormInput'
import { validateRule } from '~/constant/regex'
import { FormProvider, useForm } from 'react-hook-form'
import { LoginInputT } from './types'

const meta = {
    title: 'Login/FormInput',
    component: FormInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof FormInput>

export default meta

const Input: StoryFn<typeof FormInput> = (args) => {
    const {
        register,
        formState: { errors },
    } = useForm<{ email: string; password: string }>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    })
    return (
        <FormInput
            {...args}
            errors={args.errors || errors.email?.message}
            register={register}
        />
    )
}

export const EmailInput = Input.bind({})
EmailInput.args = {
    title: 'E-mail',
    valueName: 'email',
    errors: '',
    required: { value: true, message: '必填選項' },
    pattern: {
        value: validateRule.email,
        message: '信箱格式錯誤',
    },
}
