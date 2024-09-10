'use client'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Form } from './components/Form'
import Joi from 'joi/lib'
import LinkText from './components/LinkText/LinkText'
import FormButton from './components/FormButton/FormButton'
import FormInput from './components/FormInput/FormInput'

const SignUp = () => {
    const route = useRouter()

    const onSubmit = (data: SignUpInputT) => {
        if (data) {
            route.push('/signup/select-role')
        }
    }

    const schema = Joi.object({
        userName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required(),
    }).messages({
        'any.required': 'is a required field',
    })

    return (
        <div className="flex h-screen">
            <div className="flex flex-col flex-1 justify-center items-center">
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
                        <Image
                            alt="userAvatar"
                            src={'/Login/UserAvatar.png'}
                            width={120}
                            height={120}
                        />
                        <Form onSubmit={onSubmit} schema={schema}>
                            <FormInput
                                label="UserName"
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
