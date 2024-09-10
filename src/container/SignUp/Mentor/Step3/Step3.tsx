'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import rootStore from '~/store'
import { runInAction } from 'mobx'
import toolList from '~/constant/data/tools.json'
import disciplineList from '~/constant/data/disciplines.json'
import expertiseList from '~/constant/data/expertise.json'
import skillList from '~/constant/data/skills.json'
import FormSelect from '../../components/FormSelect/FormSelect'
import { Form } from '../../components/Form'
import FormButton from '../../components/FormButton/FormButton'
import Joi from 'joi/lib'
const Step3 = () => {
    const router = useRouter()
    const schema = Joi.object({
        expertise: Joi.array().min(1).max(3).required(),
        disciplines: Joi.array().min(1).required(),
        skills: Joi.array().min(1).required(),
        tools: Joi.array().min(1).required(),
    }).messages({
        'any.required': 'is a required field',
    })
    const onSubmit = ({
        expertise,
        disciplines,
        skills,
        tools,
    }: mentorStep3T) => {
        runInAction(() => {
            rootStore.signUpStore.expertise = expertise
            rootStore.signUpStore.disciplines = disciplines
            rootStore.signUpStore.skills = skills
            rootStore.signUpStore.tools = tools
        })
        router.push('/signup/mentor/step4')
    }
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col shadow-lg p-10 rounded-xl gap-5">
                <div className="text-3xl font-bold">
                    {"Awesome, what's your super power like?"}
                </div>
                <Form onSubmit={onSubmit} schema={schema}>
                    <FormSelect
                        label="Expertise"
                        multiple
                        registerName={'expertise'}
                        dataList={expertiseList}
                    />
                    <FormSelect
                        label="Disciplines"
                        multiple
                        registerName={'disciplines'}
                        dataList={disciplineList}
                    />
                    <FormSelect
                        label="Skills"
                        multiple
                        registerName={'skills'}
                        dataList={skillList}
                    />
                    <FormSelect
                        label="Tools"
                        multiple
                        registerName={'tools'}
                        dataList={toolList}
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
