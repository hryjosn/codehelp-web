'use client'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'

import Input from '~/components/Input'
import { validateRule } from '~/constant/regex'

const Login = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
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
                            <div>Log in to continue</div>
                        </div>
                        <div>
                            <Link
                                href={'/signup'}
                                className="underline font-bold"
                            >
                                <span>
                                    {`Don\'t have an account?`}
                                    <code>Create a new account.</code>
                                </span>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2">
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
                        <button
                            className={classNames(
                                {
                                    'bg-slate-800':
                                        Object.keys(errors).length === 0,
                                },
                                {
                                    'bg-gray-400':
                                        Object.keys(errors).length !== 0,
                                },
                                ' text-white p-3 rounded-full mt-5'
                            )}
                            disabled={Object.keys(errors).length !== 0}
                        >
                            Login
                        </button>
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
