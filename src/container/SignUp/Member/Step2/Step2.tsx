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
        title: Joi.string().max(100).required(),
        company: Joi.string().required(),
    }).messages({
        'any.required': 'is a required field',
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
            <div className="flex flex-col shadow-lg p-10 rounded-xl gap-5">
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
    )
}
export default observer(Step2)
