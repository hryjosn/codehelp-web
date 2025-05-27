'use client'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi/lib'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Button from './components/Button/Button'
import FormInput from './components/FormInput/FormInput'
import LinkText from './components/LinkText/LinkText'
import { LoginDataT, RESPONSE_CODE } from './types'
import loginHandler from '~/utils/loginHandler'
import { useRouter } from '~/i18n/routing'
import { useTranslations } from 'next-intl'

const Login = () => {
    const router = useRouter()
    const [errorText, setErrorText] = useState('')
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'email-joi-required',
            'string.email': 'email-joi-email',
        }),
        password: Joi.string().min(8).max(30).required().messages({
            'string.empty': 'password-joi-required',
            'string.min': 'password-joi-min',
            'string.max': 'password-joi-max',
        }),
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

    const t = useTranslations('Login')

    const onSubmit = async (data: LoginDataT) => {
        const res = await loginHandler({ data, router })

        if (res) {
            reset()
            switch (res.code) {
                case RESPONSE_CODE.VALIDATE_ERROR:
                    setErrorText(t('validate-error'))
                    break
                case RESPONSE_CODE.USER_DATA_ERROR:
                    setErrorText(t('email-password-error'))
                    break
                default:
                    setErrorText(t('unknown-error'))
            }
        }
    }

    return (
        <div className="flex h-screen">
            <div className="flex flex-1 flex-col items-center justify-center">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex w-full flex-col items-center justify-center gap-5">
                            <div className="text-3xl font-bold">
                                <div>{t('welcome-title')}</div>
                                <div>{t('login-subtitle')}</div>
                            </div>
                            <LinkText
                                href="/signup"
                                value={t('sign-up-link')}
                            />
                            <div className="flex flex-col items-center gap-1">
                                <FormInput
                                    title={t('email')}
                                    valueName="email"
                                />
                                <FormInput
                                    title={t('password')}
                                    valueName="password"
                                    type="password"
                                />
                                <Button errors={errors}>
                                    {t('login-button-title')}
                                </Button>
                                <p className="mt-6 min-h-6 text-red-500">
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
