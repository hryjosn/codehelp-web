'use client'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import rootStore from '~/store'
import { Form } from '../../components/Form'
import FormButton from '../../components/FormButton/FormButton'
import FormInput from '../../components/FormInput/FormInput'
import Joi from 'joi/lib'

const Step4 = () => {
    const router = useRouter()
    const schema = Joi.object({
        introduction: Joi.string().required(),
    }).messages({
        'any.required': 'is a required field',
    })
    const onSubmit = ({ introduction }: { introduction: string }) => {
        runInAction(() => {
            rootStore.signUpStore.introduction = introduction
            rootStore.signUpStore.role = 'member'
        })
        router.push('/')
    }
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col shadow-lg p-10 rounded-xl gap-5">
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

                    <div className="w-full flex justify-between">
                        <button
                            type="button"
                            className="font-bold"
                            onClick={() => router.back()}
                        >
                            {'< back'}
                        </button>
                        <FormButton variant={'nextButton'}>Complete</FormButton>
                    </div>
                </Form>
            </div>
        </div>
    )
}
export default observer(Step4)
