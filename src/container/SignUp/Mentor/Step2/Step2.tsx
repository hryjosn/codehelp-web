'use client'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import rootStore from '~/store'
import { Form } from '../../components/Form'
import FormInput from '../../components/FormInput/FormInput'
import FormButton from '../../components/FormButton/FormButton'
import Joi from 'joi/lib'
import FormSelect from '../../components/FormSelect/FormSelect'
import yearsList from '~/constant/data/years.json'
const Step2 = () => {
    const router = useRouter()
    const schema = Joi.object({
        title: Joi.string().max(100).required().messages({
            'any.required': 'Title is required',
            'string.max': 'Title cannot exceed 100 characters',
        }),
        company: Joi.string().required().messages({
            'string.empty': 'Company name is required',
        }),
        years: Joi.number().min(0).max(60).required().messages({
            'any.required': 'Please enter the number of years',
            'number.min': 'Years cannot be less than 0',
            'number.max': 'Years cannot exceed 60',
        }),
        linkedIn: Joi.string()
            .uri()
            .pattern(/^https:\/\/[a-z]{2,3}\.linkedin\.com\/in\/.*$/)
            .required()
            .messages({
                'any.required': 'Please provide a LinkedIn profile URL',
                'string.pattern.base': 'Invalid LinkedIn URL format',
                'string.uri': 'Please enter a valid LinkedIn URL',
            }),
    })
    const onSubmit = ({ title, company, years, linkedIn }: mentorStep2T) => {
        runInAction(() => {
            rootStore.signUpStore.title = title
            rootStore.signUpStore.company = company
            rootStore.signUpStore.years = years
            rootStore.signUpStore.linkedIn = linkedIn
        })
        router.push('/signup/mentor/step3')
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
                        <FormSelect
                            label="Years"
                            registerName={'years'}
                            dataList={yearsList}
                        />
                        <FormInput
                            label="LinkedIn URL"
                            registerName={'linkedIn'}
                            placeholder="https://www.linkedin.com/in/"
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
