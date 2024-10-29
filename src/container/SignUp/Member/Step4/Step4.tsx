'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import rootStore from '~/store'
import FormInput from '../../components/FormInput/FormInput'
import { RESPONSE_CODE } from '~/container/Login/store/types'
import { useState } from 'react'

const Step4 = () => {
    const router = useRouter()
    const [errorText, setErrorText] = useState('')
    const {
        signUpStore: { memberSignUp },
    } = rootStore

    const onSubmit = async ({ introduction }: { introduction: string }) => {
        try {
            const res = await memberSignUp()
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
            <div className="flex flex-col">
                <div className="text-3xl font-bold mb-10">
                    {"Lastly, what's your introduction?"}
                </div>
                <div>
                    <FormInput
                        label="Introduction"
                        registerName={'introduction'}
                        multiline
                        rows={5}
                    />
                    <p className="mb-2 min-h-6 text-red-500">{errorText}</p>
                </div>
            </div>
        </div>
    )
}
export default observer(Step4)
