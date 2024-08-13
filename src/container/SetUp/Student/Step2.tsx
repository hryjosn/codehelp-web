import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import Input from '~/components/Input'
import rootStore from '~/store'

const Step2 = () => {
    const router = useRouter()
    const {
        setUpStore: { title, company },
    } = rootStore
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title,
            company,
        },
    })
    const onSubmit = ({ title, company }: studentStep2T) => {
        runInAction(() => {
            rootStore.setUpStore.title = title
            rootStore.setUpStore.company = company
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
