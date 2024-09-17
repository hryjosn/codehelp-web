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
        introduction: Joi.string()
            .required()
            .messages({ 'string.empty': 'Introduction is required' }),
    })
    const onSubmit = ({ introduction }: { introduction: string }) => {
        runInAction(() => {
            rootStore.signUpStore.introduction = introduction
            rootStore.signUpStore.role = 'member'
        })
        router.push('/')
    }
    return (
        <div className="flex h-full items-center justify-center">
            <div className="w-150 flex items-center justify-center rounded-xl p-10 shadow-lg">
                <div className="flex flex-col gap-10">
                    <div className="text-3xl font-bold">
                        {"Lastly, what's your introduction?"}
                    </div>
                    <Form onSubmit={onSubmit} schema={schema}>
                        <FormInput
                            label="Introduction"
                            registerName={'introduction'}
                            multiline
                        />

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
