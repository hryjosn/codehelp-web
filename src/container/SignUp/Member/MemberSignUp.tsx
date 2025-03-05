'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from '~/i18n/routing'

import { Form } from '../components/Form'

import rootStore from '~/store'
import Step1 from './Step1/Step1'
import { useState } from 'react'
import FormButton from '../components/FormButton/FormButton'
import Step3 from './Step3/Step3'
import Step2 from './Step2/Step2'
import Step4 from './Step4/Step4'
import { memberSignUpT, memberSchema } from '../store/types'
import { RESPONSE_CODE } from '~/container/Login/store/types'

const MemberSignUp = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const router = useRouter()
    const [errorText, setErrorText] = useState('')
    const {
        signUpStore: { userName, password, email, avatar, memberSignUp },
    } = rootStore
    const onSubmit = async ({
        gender,
        country,
        title,
        company,
        phoneNumber,
        introduction,
        level,
        work,
    }: memberSignUpT) => {
        const formData = new FormData()

        if (!avatar) return

        formData.append('userName', userName)
        formData.append('password', password)
        formData.append(`avatar`, avatar)
        formData.append('email', email)
        formData.append('gender', gender)
        formData.append('country', country)
        formData.append('title', title)
        formData.append('company', company)
        formData.append('introduction', introduction)
        formData.append('phoneNumber', phoneNumber)
        formData.append('level', level)

        work.forEach((work) => {
            formData.append(`fieldOfWork[]`, work)
        })

        try {
            const res = await memberSignUp(formData)
            if (res.data.token) {
                router.push('/')
            }
        } catch (error) {
            switch (error) {
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

    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex w-150 items-center justify-center rounded-xl p-10 pb-4 shadow-lg">
                <Form onSubmit={onSubmit} schema={memberSchema}>
                    {currentStep === 1 && <Step1 />}
                    {currentStep === 2 && <Step2 />}
                    {currentStep === 3 && <Step3 />}
                    {currentStep === 4 && <Step4 />}
                    <div className="flex w-full justify-between">
                        <button
                            type="button"
                            className="font-bold"
                            onClick={() => {
                                if (currentStep === 1) {
                                    router.back()
                                    return
                                }
                                setCurrentStep((preState) => {
                                    return preState - 1
                                })
                            }}
                        >
                            {'< back'}
                        </button>
                        {currentStep < 4 && (
                            <button
                                type="button"
                                className="font-bold"
                                onClick={() =>
                                    setCurrentStep((preState) => {
                                        return preState + 1
                                    })
                                }
                            >
                                {'next >'}
                            </button>
                        )}
                        {currentStep === 4 && (
                            <FormButton variant={'nextButton'}>
                                Submit
                            </FormButton>
                        )}
                    </div>
                    <p className="mt-5 text-red-500">{errorText}</p>
                </Form>
            </div>
        </div>
    )
}

export default observer(MemberSignUp)
