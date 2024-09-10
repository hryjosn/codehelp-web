'use client'
import { observer } from 'mobx-react-lite'
import workList from '~/constant/data/work.json'
import levelList from '~/constant/data/level.json'
import { useRouter } from 'next/navigation'
import rootStore from '~/store'
import { runInAction } from 'mobx'
import FormSelect from '../../components/FormSelect/FormSelect'
import { Form } from '../../components/Form'
import FormButton from '../../components/FormButton/FormButton'
import Joi from 'joi/lib'
const Step3 = () => {
    const router = useRouter()
    const schema = Joi.object({
        work: Joi.array().required(),
        level: Joi.array().required(),
    }).messages({
        'any.required': 'is a required field',
    })
    const onSubmit = ({ work, level }: studentStep3T) => {
        runInAction(() => {
            rootStore.signUpStore.work = work
            rootStore.signUpStore.level = level
        })
        router.push('/signup/member/step4')
    }
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col shadow-lg p-10 rounded-xl gap-5">
                <div className="text-3xl font-bold">
                    {"Awesome, what's your super power like?"}
                </div>
                <Form onSubmit={onSubmit} schema={schema}>
                    <FormSelect
                        label="Work"
                        multiple
                        registerName={'work'}
                        dataList={workList}
                    />
                    <FormSelect
                        label="Level"
                        multiple
                        registerName={'level'}
                        dataList={levelList}
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
export default observer(Step3)
