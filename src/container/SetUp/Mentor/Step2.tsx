import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import Input from '~/components/Input'
import rootStore from '~/store'

const Step2 = () => {
    const router = useRouter()
    const {
        setUpStore: { title, company, experience, linkedIn },
    } = rootStore
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title,
            company,
            years: experience.years,
            months: experience.months,
            linkedIn,
        },
    })
    const onSubmit = ({
        title,
        company,
        years,
        months,
        linkedIn,
    }: mentorStep2T) => {
        runInAction(() => {
            rootStore.setUpStore.title = title
            rootStore.setUpStore.company = company
            rootStore.setUpStore.experience = {
                years: years,
                months: months,
            }
            rootStore.setUpStore.linkedIn = linkedIn
        })
        router.push('./step3')
    }
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col shadow-lg p-10 rounded-xl gap-5">
                <div className="text-3xl font-bold">
                    What do you do as a professional?
                </div>
                <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-2">
                        Your Title
                        <Controller
                            name="title"
                            control={control}
                            rules={{
                                required: { value: true, message: '必填選項' },
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.title && (
                            <span className="text-red-500">
                                {errors.title.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        Company/School
                        <Controller
                            name="company"
                            control={control}
                            rules={{
                                required: { value: true, message: '必填選項' },
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.company && (
                            <span className="text-red-500">
                                {errors.company.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-1 gap-5">
                        <div className="flex flex-1 flex-col gap-2">
                            Years
                            <Controller
                                name="years"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: '必填選項',
                                    },
                                    validate: {
                                        range: (value) => {
                                            const num = parseInt(value)
                                            return (
                                                (num >= 0 && num <= 30) ||
                                                '只能輸入0到30之間的數字'
                                            )
                                        },
                                    },
                                }}
                                render={({ field }) => <Input {...field} />}
                            />
                            {errors.years && (
                                <span className="text-red-500">
                                    {errors.years.message}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            Months
                            <Controller
                                name="months"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: '必填選項',
                                    },
                                    validate: {
                                        range: (value) => {
                                            const num = parseInt(value)
                                            return (
                                                (num >= 0 && num <= 12) ||
                                                '只能輸入0到12之間的數字'
                                            )
                                        },
                                    },
                                }}
                                render={({ field }) => <Input {...field} />}
                            />
                            {errors.months && (
                                <span className="text-red-500">
                                    {errors.months.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        LinkedIn URL
                        <Controller
                            name="linkedIn"
                            control={control}
                            rules={{
                                required: { value: true, message: '必填選項' },
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.linkedIn && (
                            <span className="text-red-500">
                                {errors.linkedIn.message}
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
export default observer(Step2)
