import { observer } from 'mobx-react-lite'
import { FormattedMessage } from 'react-intl'
import Image from 'next/image'
import Input from '~/components/Input'
import { Controller, useForm } from 'react-hook-form'
import { validateRule } from '~/constant/regex'
import Link from 'next/link'
import classNames from 'classnames'

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
                            <div>
                                <FormattedMessage
                                    id="login.title1"
                                    defaultMessage="Welcome to the Codehelp"
                                />
                            </div>
                            <div>
                                <FormattedMessage
                                    id="login.title2"
                                    defaultMessage="Log in to continue"
                                />
                            </div>
                        </div>
                        <div>
                            <FormattedMessage
                                id="login.tips"
                                defaultMessage="Don't have an account? <code>Create a new account.</code>"
                                values={{
                                    code: (word) => (
                                        <Link
                                            href={'/signup'}
                                            className="underline font-bold"
                                        >
                                            {word}
                                        </Link>
                                    ),
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>
                                <FormattedMessage
                                    id="signup.email"
                                    defaultMessage="E-mail"
                                />
                            </p>
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
                            <p>
                                <FormattedMessage
                                    id="signup.password"
                                    defaultMessage="Password"
                                />
                            </p>
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
                            <FormattedMessage
                                id="login.login"
                                defaultMessage="Login"
                            />
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
