'use client'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import FormController from './components/FormController/FormController'
import { StorybookFormProvider } from './components/FormController/withRHF'
import Joi from 'joi'
import LinkText from './components/LinkText/LinkText'
import { DataProps } from './store/types'
const SignUp = () => {
    const route = useRouter()

    const onSubmit = (data: DataProps) => {
        if (data) {
            route.push('/')
        }
    }

    const schema = Joi.object({
        UserName: Joi.string().min(3).max(30).required(),
        Email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        Password: Joi.string().min(8).max(30).required(),
    }).messages({
        'any.required': 'is a required field',
    })

    return (
        <div className="flex h-screen">
            <div className="flex flex-col flex-1 justify-center items-center">
                <div>
                    <div className="w-full flex flex-col justify-center px-40 gap-5">
                        <div className="text-3xl font-bold">
                            <div>Welcome to the Codehelp</div>
                            <div>Create a new account</div>
                        </div>
                        <div>
                            <LinkText
                                href={'/login'}
                                text={'You have account? Click here to login'}
                            />
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <Image
                                alt="userAvatar"
                                src={'/Login/UserAvatar.png'}
                                width={120}
                                height={120}
                            />
                            <StorybookFormProvider
                                onSubmit={onSubmit}
                                schema={schema}
                            >
                                <div className="flex flex-col gap-3">
                                    <FormController
                                        placeholder="Enter 3 to 30 characters"
                                        label="UserName"
                                    />
                                    <FormController
                                        placeholder="Enter your email"
                                        label="Email"
                                    />
                                    <FormController
                                        placeholder="Enter 8 to 30 characters"
                                        label="Password"
                                        type={'password'}
                                    />
                                </div>
                            </StorybookFormProvider>
                        </div>
                    </div>
                </div>
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
