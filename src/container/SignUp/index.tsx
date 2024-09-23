'use client'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import Input from '~/components/Input'
import { validateRule } from '~/constant/regex'
const SignUp = () => {
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
            <div className="flex flex-1 flex-col items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex w-full flex-col justify-center gap-5 px-40">
                        <div className="text-3xl font-bold">
                            <div>Welcome to the Codehelp</div>
                            <div>Create a new account</div>
                        </div>
                        <div>
                            <Link
                                href={'/login'}
                                className="font-bold underline"
                            >
                                You have account?{' '}
                                <code>Click here to login</code>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Image
                                alt="userAvatar"
                                src={'/Login/UserAvatar.png'}
                                width={120}
                                height={120}
                            />
                            <p>User Name</p>
                            <Controller
                                name="userName"
                                control={control}
                                render={({ field }) => (
                                    <Input label={'userName'} {...field} />
                                )}
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
                                'mt-5 rounded-full p-3 text-white'
                            )}
                            disabled={Object.keys(errors).length !== 0}
                        >
                            Sign Up
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
export default observer(SignUp)
