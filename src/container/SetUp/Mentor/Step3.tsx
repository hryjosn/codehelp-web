import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import rootStore from '~/store'
import { runInAction } from 'mobx'
import toolList from '~/constant/data/tools.json'
import disciplineList from '~/constant/data/disciplines.json'
import expertiseList from '~/constant/data/expertise.json'
import skillList from '~/constant/data/skills.json'
const Step3 = () => {
    const router = useRouter()
    const [expertise, setExpertise] = useState<string[]>([])
    const [disciplines, setDisciplines] = useState<string[]>([])
    const [skills, setSkills] = useState<string[]>([])
    const [tools, setTools] = useState<string[]>([])
    const expertiseChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value
        setExpertise(typeof value === 'string' ? value.split(',') : value)
    }
    const disciplinesChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value
        setDisciplines(typeof value === 'string' ? value.split(',') : value)
    }
    const skillsChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value
        setSkills(typeof value === 'string' ? value.split(',') : value)
    }
    const toolsChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value
        setTools(typeof value === 'string' ? value.split(',') : value)
    }
    const {
        setUpStore: {
            expertise: Expertise,
            disciplines: Disciplines,
            skills: Skills,
            tools: Tools,
        },
    } = rootStore
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            expertise: Expertise,
            disciplines: Disciplines,
            skills: Skills,
            tools: Tools,
        },
    })
    const onSubmit = ({
        expertise,
        disciplines,
        skills,
        tools,
    }: mentorStep3T) => {
        runInAction(() => {
            rootStore.setUpStore.expertise = expertise
            rootStore.setUpStore.disciplines = disciplines
            rootStore.setUpStore.skills = skills
            rootStore.setUpStore.tools = tools
        })
        router.push('./step4')
    }
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col shadow-lg p-10 rounded-xl gap-5">
                <div className="text-3xl font-bold">
                    Awesome, what’s your super power like?
                </div>
                <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-2">
                        Expertise
                        <Controller
                            name="expertise"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: '必填選項',
                                },
                            }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    multiple
                                    value={expertise || Expertise}
                                    onChange={(e) => {
                                        expertiseChange(e)
                                        field.onChange(e)
                                    }}
                                    input={<OutlinedInput />}
                                    className="h-12 rounded-lg"
                                >
                                    {expertiseList.map((expertise, index) => (
                                        <MenuItem key={index} value={expertise}>
                                            {expertise}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.expertise && (
                            <span className="text-red-500">
                                {errors.expertise.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        Disciplines
                        <Controller
                            name="disciplines"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: '必填選項',
                                },
                            }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    multiple
                                    value={disciplines || Disciplines}
                                    onChange={(e) => {
                                        disciplinesChange(e)
                                        field.onChange(e)
                                    }}
                                    input={<OutlinedInput />}
                                    className="h-12 rounded-lg"
                                >
                                    {disciplineList.map((discipline, index) => (
                                        <MenuItem
                                            key={index}
                                            value={discipline}
                                        >
                                            {discipline}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.disciplines && (
                            <span className="text-red-500">
                                {errors.disciplines.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        Skills
                        <Controller
                            name="skills"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: '必填選項',
                                },
                            }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    multiple
                                    value={skills || Skills}
                                    onChange={(e) => {
                                        skillsChange(e)
                                        field.onChange(e)
                                    }}
                                    input={<OutlinedInput />}
                                    className="h-12 rounded-lg"
                                >
                                    {skillList.map((skill, index) => (
                                        <MenuItem key={index} value={skill}>
                                            {skill}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.skills && (
                            <span className="text-red-500">
                                {errors.skills.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        Tools
                        <Controller
                            name="tools"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: '必填選項',
                                },
                            }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    multiple
                                    value={tools || Tools}
                                    onChange={(e) => {
                                        toolsChange(e)
                                        field.onChange(e)
                                    }}
                                    input={<OutlinedInput />}
                                    className="h-12 rounded-lg"
                                >
                                    {toolList.map((tool, index) => (
                                        <MenuItem key={index} value={tool}>
                                            {tool}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.tools && (
                            <span className="text-red-500">
                                {errors.tools.message}
                            </span>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="font-bold"
                            onClick={() => router.back()}
                        >
                            {'< back'}
                        </button>
                        <button
                            type="submit"
                            className="bg-sky-600 p-4 rounded-lg text-white"
                        >
                            {'Next'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default observer(Step3)
