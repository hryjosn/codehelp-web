'use client'

import { observer } from 'mobx-react-lite'
import { useRouter } from '~/i18n/routing'
import { Form } from './components/Form'
import LinkText from './components/LinkText/LinkText'
import FormButton from './components/FormButton/FormButton'
import FormInput from './components/FormInput/FormInput'
import AvatarSelect from './components/AvatarSelect/AvatarSelect'
import { SignUpInputT, signUpSchema } from './store/types'
import { useStore } from '~/store/rootStoreProvider'

const SignUp = () => {
    const route = useRouter()
    const {
        signUpStore: { setAvatar, setEmail, setPassword, setUserName },
    } = useStore()
    const onSubmit = ({ avatar, userName, email, password }: SignUpInputT) => {
        if (!avatar.name || !avatar.size || !avatar.type) return
        setAvatar(avatar)
        setEmail(email)
        setPassword(password)
        setUserName(userName)
        route.push('/signup/select-role')
    }

    return (
        <div className="flex flex-col items-center justify-center">
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
                    <Form onSubmit={onSubmit} schema={signUpSchema}>
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
    )
}
export default observer(SignUp)
