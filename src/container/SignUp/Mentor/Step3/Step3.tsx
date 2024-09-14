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
import { Box, Chip } from '@mui/material'
const Step3 = () => {
    const router = useRouter()
    const schema = Joi.object({
        expertise: Joi.array().min(1).max(3).required().messages({
            'array.min': 'Please select at least 1 area of expertise',
            'array.max': 'You can select up to 3 areas of expertise',
            'any.required': 'Expertise is a required field',
        }),
        disciplines: Joi.array().min(1).required().messages({
            'array.min': 'Please select at least 1 discipline',
            'any.required': 'Disciplines is a required field',
        }),
        skills: Joi.array().min(1).required().messages({
            'array.min': 'Please select at least 1 skill',
            'any.required': 'Skills is a required field',
        }),
        tools: Joi.array().min(1).required().messages({
            'array.min': 'Please select at least 1 tool',
            'any.required': 'Tools is a required field',
        }),
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
            <div className="flex justify-center items-center shadow-lg p-10 rounded-xl w-150">
                <div className="flex flex-col gap-10">
                    <div className="text-3xl font-bold">
                        {"What's your super power like?"}
                    </div>
                    <Form onSubmit={onSubmit} schema={schema}>
                        <FormSelect
                            label="Expertise"
                            multiple
                            registerName={'expertise'}
                            dataList={expertiseList}
                            renderValue={(value) => {
                                const selected = value as string[]
                                return (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 0.5,
                                        }}
                                    >
                                        {selected?.map((value, index) => (
                                            <Chip key={index} label={value} />
                                        ))}
                                    </Box>
                                )
                            }}
                        />
                        <FormSelect
                            label="Disciplines"
                            multiple
                            registerName={'disciplines'}
                            dataList={disciplineList}
                            renderValue={(value) => {
                                const selected = value as string[]
                                return (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 0.5,
                                        }}
                                    >
                                        {selected?.map((value, index) => (
                                            <Chip key={index} label={value} />
                                        ))}
                                    </Box>
                                )
                            }}
                        />
                        <FormSelect
                            label="Skills"
                            multiple
                            registerName={'skills'}
                            dataList={skillList}
                            renderValue={(value) => {
                                const selected = value as string[]
                                return (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 0.5,
                                        }}
                                    >
                                        {selected?.map((value, index) => (
                                            <Chip key={index} label={value} />
                                        ))}
                                    </Box>
                                )
                            }}
                        />
                        <FormSelect
                            label="Tools"
                            multiple
                            registerName={'tools'}
                            dataList={toolList}
                            renderValue={(value) => {
                                const selected = value as string[]
                                return (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 0.5,
                                        }}
                                    >
                                        {selected?.map((value, index) => (
                                            <Chip key={index} label={value} />
                                        ))}
                                    </Box>
                                )
                            }}
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
export default observer(Step3)
