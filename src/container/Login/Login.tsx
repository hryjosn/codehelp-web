'use client'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

import Button from './components/Button/Button'
import FormInput from './components/FormInput/FormInput'
import LinkText from './components/LinkText/LinkText'
import { validateRule } from '~/constant/regex'
import { LoginDataT, RESPONSE_CODE } from './store/types'
import { callMemberLogin } from '~/api/user'
import { useRouter } from 'next/navigation'
import { isAxiosError } from 'axios'
import { useState } from 'react'

const Login = () => {
    const [errorText, setErrorText] = useState('')
    const router = useRouter()
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: LoginDataT) => {
        try {
            const res = await callMemberLogin(data)
            if (res.data.msg === 'Login successful') {
                router.push('/')
            }
        } catch (error) {
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
        }
    }
    return (
        <div className="flex h-screen">
            <div className="flex flex-col flex-1 justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col justify-center gap-5">
                        <div className="text-3xl font-bold">
                            <div>Welcome to the Codehelp</div>
                            <div>Log in to continue</div>
                        </div>
                        <div>
                            <LinkText
                                href="/signup"
                                value={`Don\'t have an account? Create a new account.`}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormInput
                                title="E-mail"
                                valueName="email"
                                register={register}
                                required={{
                                    value: true,
                                    message: '必填選項',
                                }}
                                pattern={{
                                    value: validateRule.email,
                                    message: '電子郵件格式錯誤',
                                }}
                                errors={errors.email?.message}
                            />
                            <FormInput
                                title="Password"
                                valueName="password"
                                type="password"
                                register={register}
                                required={{
                                    value: true,
                                    message: '必填選項',
                                }}
                                pattern={{
                                    value: validateRule.password,
                                    message: '密碼格式錯誤',
                                }}
                                errors={errors.password?.message}
                            />
                        </div>
                        <Button errors={errors}>Login</Button>
                        <div className="text-center text-red-500">
                            {errorText}
                        </div>
                    </div>
                </form>
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
