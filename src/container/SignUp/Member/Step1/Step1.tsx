'use client'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import countryList from '~/constant/data/countries.json'
import rootStore from '~/store'
import { Form } from '../../components/Form'
import FormSelect from '../../components/FormSelect/FormSelect'
import FormButton from '../../components/FormButton/FormButton'
import Joi from 'joi/lib'
import FormInput from '../../components/FormInput/FormInput'
const Step1 = () => {
    const router = useRouter()
    const schema = Joi.object({
        phoneNumber: Joi.number().required(),
        country: Joi.string().required(),
    }).messages({
        'any.required': 'is a required field',
    })
    const onSubmit = ({ phoneNumber, country }: studentStep1T) => {
        runInAction(() => {
            rootStore.signUpStore.phoneNumber = phoneNumber
            rootStore.signUpStore.country = country
        })
        router.push('/signup/member/step2')
    }
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col shadow-lg p-10 rounded-xl gap-10">
                <div className="text-3xl font-bold">
                    {"Hello! What's your origin story?"}
                </div>
                <Form onSubmit={onSubmit} schema={schema}>
                    <FormInput
                        label="Phone number"
                        registerName={'phoneNumber'}
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
