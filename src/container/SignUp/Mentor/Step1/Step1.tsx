'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import genderList from '~/constant/data/gender.json'
import countryList from '~/constant/data/countries.json'
import FormSelect from '../../components/FormSelect/FormSelect'
import { Form } from '../../components/Form'
import Joi from 'joi/lib'
import FormButton from '../../components/FormButton/FormButton'
import rootStore from '~/store'
import { runInAction } from 'mobx'
const Step1 = () => {
    const router = useRouter()
    const schema = Joi.object({
        gender: Joi.string().required(),
        country: Joi.string().required(),
    }).messages({
        'any.required': 'is a required field',
    })
    const onSubmit = ({ gender, country }: mentorStep1T) => {
        runInAction(() => {
            rootStore.signUpStore.gender = gender
            rootStore.signUpStore.country = country
        })
        router.push('/signup/mentor/step2')
    }
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col shadow-lg p-10 rounded-xl gap-10">
                <div className="text-3xl font-bold">
                    {"Hello! What's your origin story?"}
                </div>
                <Form onSubmit={onSubmit} schema={schema}>
                    <FormSelect
                        label="Gender"
                        registerName={'gender'}
                        dataList={genderList}
                    />
                    <FormSelect
                        label="Country"
                        registerName={'country'}
                        dataList={countryList}
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

export default observer(Step1)
