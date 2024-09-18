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
import FormPhoneInput from '../../components/FormPhoneInput/FormPhoneInput'
const Step1 = () => {
    const router = useRouter()
    const schema = Joi.object({
        phoneNumber: Joi.string().max(17).required().messages({
            'string.empty': 'Phone number is required',
            'string.max': "This doesn't look like a phone number",
        }),
        gender: Joi.string()
            .required()
            .messages({ 'any.required': 'Gender is required' }),
        country: Joi.string()
            .required()
            .messages({ 'any.required': 'Country is required' }),
    }).messages({
        'any.required': 'is a required field',
    })
    const onSubmit = ({ phoneNumber, gender, country }: step1T) => {
        runInAction(() => {
            rootStore.signUpStore.phoneNumber = phoneNumber
            rootStore.signUpStore.gender = gender
            rootStore.signUpStore.country = country
        })
        router.push('/signup/mentor/step2')
    }
    return (
        <div className="flex h-full items-center justify-center">
            <div className="w-150 flex items-center justify-center rounded-xl p-10 shadow-lg">
                <div className="flex flex-col gap-10">
                    <div className="text-3xl font-bold">
                        {"Hello! What's your origin story?"}
                    </div>
                    <Form onSubmit={onSubmit} schema={schema}>
                        <FormPhoneInput
                            label="Phone number"
                            registerName={'phoneNumber'}
                        />
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
                        <div className="flex w-full justify-between">
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

export default observer(Step1)
