'use client'
import { joiResolver } from '@hookform/resolvers/joi'
import { isAxiosError } from 'axios'
import Joi from 'joi/lib'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useRouter } from '~/i18n/routing'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useLogin } from '~/api/user/user'
import Button from './components/Button/Button'
import FormInput from './components/FormInput/FormInput'
import LinkText from './components/LinkText/LinkText'
import { LoginDataT, RESPONSE_CODE } from './store/types'

const Login = () => {
    const [errorText, setErrorText] = useState('')
    const router = useRouter()
    const schema = Joi.object({
        email: Joi.string().email().required(),
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
    const {
        handleSubmit,
        reset,
        formState: { errors },
    } = methods

    const { mutate: login } = useLogin()

    const onSubmit = async (data: LoginDataT) => {
        login(data, {
            onSuccess(res) {
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token)
                    router.push('/')
                }
            },
            onError: (error) => {
                reset()
                if (isAxiosError(error)) {
                    switch (error.response?.data.code) {
                        case RESPONSE_CODE.VALIDATE_ERROR:
                            setErrorText('Validate error')
                            break
                        case RESPONSE_CODE.USER_DATA_ERROR:
                            setErrorText('Email or password is wrong')
                            break
                        default:
                            setErrorText('Unknown error')
                    }
                }
            },
        })
    }

    return (
        <div className="flex h-screen">
            <div className="flex flex-1 flex-col items-center justify-center">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex w-full flex-col items-center justify-center gap-5">
                            <div className="text-3xl font-bold">
                                <div>Welcome to the Codehelp</div>
                                <div>Log in to continue</div>
                            </div>
                            <LinkText
                                href="/signup"
                                value={`Don\'t have an account? Create a new account.`}
                            />
                            <div className="flex flex-col items-center gap-1">
                                <FormInput title="E-mail" valueName="email" />
                                <FormInput
                                    title="Password"
                                    valueName="password"
                                    type="password"
                                />
                                <Button errors={errors}>Login</Button>
                                <p className="min-h-6 text-red-500">
                                    {errorText}
                                </p>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </div>
            <div className="flex flex-1">
                <Image
                    priority
                    alt="The beautiful picture"
                    src="/Login/Login_Picture.jpg"
                    width={932}
                    height={622}
                />
            </div>
        </div>
    )
}
export default observer(Login)
