import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import workList from '~/constant/data/work.json'
import levelList from '~/constant/data/level.json'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import rootStore from '~/store'
import { runInAction } from 'mobx'
const Step3 = () => {
    const router = useRouter()
    const [work, setWork] = useState<string>('')
    const [level, setLevel] = useState<string>('')
    const workChange = (event: SelectChangeEvent) => {
        setWork(event.target.value as string)
    }
    const levelChange = (event: SelectChangeEvent) => {
        setLevel(event.target.value as string)
    }
    const {
        setUpStore: { work: Work, level: Level },
    } = rootStore
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            work: Work,
            level: Level,
        },
    })
    const onSubmit = ({ work, level }: studentStep3T) => {
        runInAction(() => {
            rootStore.setUpStore.work = work
            rootStore.setUpStore.level = level
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
                        Work
                        <Controller
                            name="work"
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
                                    value={work || Work}
                                    onChange={(e) => {
                                        workChange(e)
                                        field.onChange(e)
                                    }}
                                    input={<OutlinedInput />}
                                    className="h-12 rounded-lg"
                                >
                                    {workList.map((work, index) => (
                                        <MenuItem key={index} value={work}>
                                            {work}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.work && (
                            <span className="text-red-500">
                                {errors.work.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        Level
                        <Controller
                            name="level"
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
                                    value={level || Level}
                                    onChange={(e) => {
                                        levelChange(e)
                                        field.onChange(e)
                                    }}
                                    input={<OutlinedInput />}
                                    className="h-12 rounded-lg"
                                >
                                    {levelList.map((level, index) => (
                                        <MenuItem key={index} value={level}>
                                            {level}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.level && (
                            <span className="text-red-500">
                                {errors.level.message}
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
