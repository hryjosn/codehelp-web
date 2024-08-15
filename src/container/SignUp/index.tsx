'use client'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import Input from '~/components/Input'
import { validateRule } from '~/constant/regex'
import Button from './components/Button/Button'
import { useRouter } from 'next/navigation'
import InputController from './components/InputController/InputController'
const SignUp = () => {
    const route = useRouter()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            userName: '',
        },
    })
    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <div className="flex h-screen">
            <div className="flex flex-col flex-1 justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col justify-center px-40 gap-5">
                        <div className="text-3xl font-bold">
                            <div>Welcome to the Codehelp</div>
                            <div>Create a new account</div>
                        </div>
                        <div>
                            <Link
                                href={'/login'}
                                className="underline font-bold"
                            >
                                You have account? Click here to login
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Image
                                alt="userAvatar"
                                src={'/Login/UserAvatar.png'}
                                width={120}
                                height={120}
                            />
                            <InputController
                                placeholder="UserName"
                                label="User Name"
                                control={control}
                                errors={errors}
                            />
                            <p>E-mail</p>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input label={'email'} {...field} />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: '必填選項',
                                    },
                                    pattern: {
                                        value: validateRule.email,
                                        message: '電子郵件格式錯誤',
                                    },
                                }}
                            />
                            <p>Password</p>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label={'password'}
                                        type={'password'}
                                        {...field}
                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: '必填選項',
                                    },
                                    pattern: {
                                        value: validateRule.password,
                                        message: '密碼格式錯誤',
                                    },
                                }}
                            />
                        </div>
                        <Button
                            text={'Sign Up'}
                            validation
                            onClick={() => {
                                route.push('/')
                            }}
                        />
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
export default observer(SignUp)
