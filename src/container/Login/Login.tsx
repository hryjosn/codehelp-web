'use client'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { FormProvider, useForm } from 'react-hook-form'
import Button from './components/Button/Button'
import FormInput from './components/FormInput/FormInput'
import LinkText from './components/LinkText/LinkText'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'

const Login = () => {
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
    const {
        handleSubmit,
        formState: { errors },
    } = methods

    const onSubmit = (data: any) => {
        console.log(data)
    }
    return (
        <div className="flex h-screen">
            <div className="flex flex-col flex-1 justify-center items-center">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex flex-col justify-center items-center gap-5">
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
                            </div>
                            <Button errors={errors}>Login</Button>
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
