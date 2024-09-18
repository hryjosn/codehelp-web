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
import { Box, Chip } from '@mui/material'
const Step3 = () => {
    const router = useRouter()
    const schema = Joi.object({
        work: Joi.array().required().messages({
            'any.required': 'Work is required',
        }),
        level: Joi.string().required().messages({
            'any.required': 'Level is required',
        }),
    })
    const onSubmit = ({ work, level }: studentStep3T) => {
        runInAction(() => {
            rootStore.signUpStore.work = work
            rootStore.signUpStore.level = level
        })
        router.push('/signup/member/step4')
    }
    return (
        <div className="flex h-full items-center justify-center">
            <div className="w-150 flex items-center justify-center rounded-xl p-10 shadow-lg">
                <div className="flex flex-col gap-10">
                    <div className="text-3xl font-bold">
                        {"What's your super power like?"}
                    </div>
                    <Form onSubmit={onSubmit} schema={schema}>
                        <FormSelect
                            label="Work"
                            multiple
                            registerName={'work'}
                            dataList={workList}
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
                            label="Level"
                            registerName={'level'}
                            dataList={levelList}
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
export default observer(Step3)
