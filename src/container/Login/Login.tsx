'use client'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

import Button from './components/Button/Button'
import FormInput from './components/FormInput/FormInput'
import LinkText from './components/LinkText/LinkText'
import { validateRule } from '~/constant/regex'

const Login = () => {
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
    const onSubmit = (data: any) => {
        console.log(data)
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
                            <LinkText href="/signup">
                                <span>
                                    {`Don\'t have an account? `}
                                    <code>Create a new account.</code>
                                </span>
                            </LinkText>
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormInput
                                title="E-mail"
                                label="email"
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
                                label="password"
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
                        <Button title="Login" errors={errors} />
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
