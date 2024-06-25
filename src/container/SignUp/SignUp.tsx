import { observer } from 'mobx-react-lite'
import { FormattedMessage } from 'react-intl'
import Image from 'next/image'
import Input from '~/components/Input'
import { useForm, Controller } from 'react-hook-form'
import { rule } from '~/constant/regex'
const SignUp = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            avatar: '',
            userName: '',
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
                                    id="signup.title1"
                                    defaultMessage="Welcome to the codeHelp"
                                />
                            </div>
                            <div>
                                <FormattedMessage
                                    id="signup.title2"
                                    defaultMessage="Create a new account"
                                />
                            </div>
                        </div>
                        <div>
                            <FormattedMessage
                                id="signup.tips"
                                defaultMessage="You have account? Click here to login"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Image
                                alt="userAvatar"
                                src={'/Login/UserAvatar.png'}
                                width={120}
                                height={120}
                                className="self-center cursor-pointer"
                            />
                            <p>
                                <FormattedMessage
                                    id="signup.username"
                                    defaultMessage="UserName"
                                />
                            </p>
                            <Controller
                                name="userName"
                                control={control}
                                render={({ field }) => (
                                    <Input label={'userName'} {...field} />
                                )}
                            />
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
                                        value: rule.email,
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
                                        value: rule.password,
                                        message: '密碼格式錯誤',
                                    },
                                }}
                            />
                        </div>
                        <button
                            className={`${Object.keys(errors).length === 0 ? 'bg-slate-800' : 'bg-gray-400'} text-white p-3 rounded-full mt-5`}
                            disabled={Object.keys(errors).length !== 0}
                        >
                            <FormattedMessage
                                id="signup.signup"
                                defaultMessage="Sign Up"
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
export default observer(SignUp)
