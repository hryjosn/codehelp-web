'use client'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import rootStore from '~/store'
import { Form } from '../../components/Form'
import FormInput from '../../components/FormInput/FormInput'
import FormButton from '../../components/FormButton/FormButton'
import Joi from 'joi/lib'

const Step2 = () => {
    const router = useRouter()
    const schema = Joi.object({
        title: Joi.string().max(100).required().messages({
            'string.max': 'Title should not exceed 100 characters',
            'string.empty': 'Title is required',
        }),
        company: Joi.string().required().messages({
            'string.empty': 'Company name is required',
        }),
    })
    const onSubmit = ({ title, company }: studentStep2T) => {
        runInAction(() => {
            rootStore.signUpStore.title = title
            rootStore.signUpStore.company = company
        })
        router.push('/signup/member/step3')
    }
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex justify-center items-center shadow-lg p-10 rounded-xl w-150">
                <div className="flex flex-col gap-10">
                    <div className="text-3xl font-bold">
                        What do you do as a professional?
                    </div>
                    <Form onSubmit={onSubmit} schema={schema}>
                        <FormInput label="Your title" registerName={'title'} />
                        <FormInput
                            label="Company/School"
                            registerName={'company'}
                        />
                        <div className="w-full flex justify-between">
                            <button
                                type="button"
                                className="font-bold"
                                onClick={() => router.back()}
                            >
                                {'< back'}
                            </button>
                            <FormButton variant={'nextButton'}>Next</FormButton>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default observer(Step2)
