'use client'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import rootStore from '~/store'
import { Form } from '../../components/Form'
import FormButton from '../../components/FormButton/FormButton'
import FormInput from '../../components/FormInput/FormInput'
import Joi from 'joi/lib'
import { isAxiosError } from 'axios'
import { RESPONSE_CODE } from '~/container/Login/store/types'
import { useState } from 'react'

const Step4 = () => {
    const router = useRouter()
    const [errorText, setErrorText] = useState('')
    const {
        signUpStore: { memberSignUp },
    } = rootStore
    const schema = Joi.object({
        introduction: Joi.string()
            .required()
            .messages({ 'string.empty': 'Introduction is required' }),
    })
    const onSubmit = async ({ introduction }: { introduction: string }) => {
        runInAction(() => {
            rootStore.signUpStore.introduction = introduction
        })
        try {
            const res = await memberSignUp()
            if (res.data.token) {
                router.push('/')
            }
        } catch (error) {
            if (isAxiosError(error)) {
                switch (error.response?.data.code) {
                    case RESPONSE_CODE.VALIDATE_ERROR:
                        setErrorText(
                            'Validate error: Please check your information'
                        )
                        break
                    default:
                        setErrorText('Unknown error')
                }
            }
        }
    }
    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex w-150 items-center justify-center rounded-xl p-10 shadow-lg">
                <div className="flex flex-col gap-10">
                    <div className="text-3xl font-bold">
                        {"Lastly, what's your introduction?"}
                    </div>
                    <Form onSubmit={onSubmit} schema={schema}>
                        <FormInput
                            label="Introduction"
                            registerName={'introduction'}
                            multiline
                            rows={10}
                        />
                        <p className="mb-2 min-h-6 text-red-500">{errorText}</p>
                        <div className="flex w-full justify-between">
                            <button
                                type="button"
                                className="font-bold"
                                onClick={() => router.back()}
                            >
                                {'< back'}
                            </button>
                            <FormButton variant={'nextButton'}>
                                Complete
                            </FormButton>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default observer(Step4)
