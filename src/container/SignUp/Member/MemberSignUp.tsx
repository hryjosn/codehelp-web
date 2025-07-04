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
import { memberSignUpT, memberSchema } from '../store/types'
import { RESPONSE_CODE } from '~/container/Login/types'
import { useMemberSignUp } from '~/api/user/user'
import Lottie from 'lottie-react'
import LoadAnimation from '~/../public/Lottie/loading.json'
import loginHandler from '~/utils/loginHandler'
import { useStore } from '~/store/rootStoreProvider'
import { refactorPhoneNumber } from '~/lib/utils'

const MemberSignUp = () => {
    const { mutateAsync: memberSignUp, isPending } = useMemberSignUp()
    const [currentStep, setCurrentStep] = useState(1)
    const router = useRouter()
    const [errorText, setErrorText] = useState('')

    const {
        signUpStore: { userName, password, email, avatar, countryCode },
    } = useStore()
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
        let newPhoneNumber = ''

        newPhoneNumber = refactorPhoneNumber({
            phoneNumber,
            countryCode,
        })

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
        formData.append('phoneNumber', newPhoneNumber)
        formData.append('level', level)

        work.forEach((work) => {
            formData.append(`fieldOfWork[]`, work)
        })

        try {
            memberSignUp(formData, {
                onSuccess(res) {
                    if (res?.data?.token) {
                        loginHandler({ data: { email, password }, router })
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
            <div className="flex w-90 rounded-xl pd-2  pt-8 px-7 shadow-lg md:w-150 md:pb-4 md:p-10 bg-white">
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
                    <p className="mt-5 text-red-500">{errorText}</p>
                </Form>
            </div>
        </div>
    )
}

export default observer(MemberSignUp)
