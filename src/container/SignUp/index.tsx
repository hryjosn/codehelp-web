'use client'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Form } from './components/Form'
import Joi from 'joi/lib'
import LinkText from './components/LinkText/LinkText'
import FormButton from './components/FormButton/FormButton'
import FormInput from './components/FormInput/FormInput'
import rootStore from '~/store'
import { runInAction } from 'mobx'
import AvatarSelect from './components/AvatarSelect/AvatarSelect'
import { SignUpInputT } from './store/types'

const SignUp = () => {
    const route = useRouter()

    const onSubmit = ({ userName, email, password }: SignUpInputT) => {
        runInAction(() => {
            rootStore.signUpStore.userName = userName
            rootStore.signUpStore.email = email
            rootStore.signUpStore.password = password
        })

        route.push('/signup/select-role')
    }

    const schema = Joi.object({
        userName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required(),
        avatar: Joi.object({
            name: Joi.string().required(),
            size: Joi.number()
                .max(1 * 1024 * 1024)
                .required(),
            type: Joi.string().valid('image/jpeg', 'image/png').required(),
        }),
    }).messages({
        'any.required': 'is a required field',
    })

    return (
        <div className="flex h-screen">
            <div className="flex flex-1 flex-col items-center justify-center">
                <div className="flex flex-col gap-5">
                    <div className="text-3xl font-bold">
                        <div>Welcome to the Codehelp</div>
                        <div>Create a new account</div>
                    </div>
                    <div>
                        <LinkText href={'/login'} variant={'underline'}>
                            You have account? Click here to login
                        </LinkText>
                    </div>
                    <div className="flex flex-col items-center">
                        <Form onSubmit={onSubmit} schema={schema}>
                            <AvatarSelect registerName="avatar" />
                            <FormInput
                                label="Username"
                                placeholder="Enter 3 to 30 characters"
                                registerName="userName"
                            />
                            <FormInput
                                label="Email"
                                placeholder="Enter your email"
                                registerName="email"
                            />
                            <FormInput
                                label="Password"
                                placeholder="Enter 8 to 30 characters"
                                registerName="password"
                                type={'password'}
                            />
                            <FormButton>Sign Up</FormButton>
                        </Form>
                    </div>
                </div>
            </div>
            <Image
                priority
                alt="The beautiful picture"
                src="/Login/Login_Picture.jpg"
                className="flex-1"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: 'auto', height: 'auto' }}
            />
        </div>
    )
}
export default observer(SignUp)
