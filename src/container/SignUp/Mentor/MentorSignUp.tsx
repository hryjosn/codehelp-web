'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from '~/i18n/routing'
import { Form } from '../components/Form'

import Step1 from './Step1/Step1'
import { useState } from 'react'
import FormButton from '../components/FormButton/FormButton'
import Step3 from './Step3/Step3'
import Step2 from './Step2/Step2'
import Step4 from './Step4/Step4'
import { mentorSchema, mentorSignUpT } from '../store/types'
import { RESPONSE_CODE } from '~/container/Login/types'
import { useMentorSignUp } from '~/api/user/user'
import Lottie from 'lottie-react'
import LoadAnimation from '~/../public/Lottie/loading.json'
import loginHandler from '~/utils/loginHandler'
import { useStore } from '~/store/rootStoreProvider'

const MentorSignUp = () => {
    const { mutate: mentorSignUp, isPending } = useMentorSignUp()
    const [currentStep, setCurrentStep] = useState(1)
    const router = useRouter()
    const [errorText, setErrorText] = useState('')

    const {
        signUpStore: { userName, password, email, avatar },
    } = useStore()
    const onSubmit = async ({
        gender,
        country,
        title,
        company,
        introduction,
        phoneNumber,
        linkedIn,
        expertise,
        disciplines,
        skills,
        tools,
        level,
        education,
    }: mentorSignUpT) => {
        const formData = new FormData()

        if (!avatar) return

        formData.append('userName', userName)
        formData.append('password', password)
        formData.append('email', email)
        formData.append(`avatar`, avatar)
        formData.append('gender', gender)
        formData.append('country', country)
        formData.append('title', title)
        formData.append('company', company)
        formData.append('level', level)
        formData.append('introduction', introduction)
        formData.append('phoneNumber', phoneNumber)
        formData.append('linkedInURL', linkedIn)
        formData.append('education', education)
        formData.append('primaryExpertise', expertise[0])
        formData.append('secondaryExpertise', expertise[1] || '')
        formData.append('tertiaryExpertise', expertise[2] || '')
        disciplines.forEach((discipline) => {
            formData.append('disciplines[]', discipline)
        })
        skills.forEach((skill) => {
            formData.append('skills[]', skill)
        })
        tools.forEach((tool) => {
            formData.append('tools[]', tool)
        })

        try {
            mentorSignUp(formData, {
                onSuccess(res) {
                    if (res?.data?.token) {
                        loginHandler({ email, password })
                    }
                },
            })
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
            <div className="flex w-150 rounded-xl p-10 pb-4 shadow-lg">
                <Form onSubmit={onSubmit} schema={mentorSchema}>
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
                                {isPending ? (
                                    <Lottie
                                        animationData={LoadAnimation}
                                        className="-my-3 h-12 w-14"
                                    />
                                ) : (
                                    'Submit'
                                )}
                            </FormButton>
                        )}
                    </div>
                    <p className="mt-5 min-h-6 text-red-500">{errorText}</p>
                </Form>
            </div>
        </div>
    )
}

export default observer(MentorSignUp)
