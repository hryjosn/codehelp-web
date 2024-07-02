import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import Input from '~/components/Input'
import rootStore from '~/store'

const Step4 = () => {
    const router = useRouter()
    const {
        setUpStore: { story },
    } = rootStore
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            story,
        },
    })

    const onSubmit = ({ story }: { story: string }) => {
        runInAction(() => {
            rootStore.setUpStore.story = story
        })
        router.push('../../signup')
    }
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col shadow-lg p-10 rounded-xl gap-5">
                <div className="text-3xl font-bold">
                    Lastly, what’s your story?
                </div>
                <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-2">
                        Story
                        <Controller
                            name="story"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: '必填選項',
                                },
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.story && (
                            <span className="text-red-500">
                                {errors.story.message}
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
                            className="bg-sky-600 px-4 py-3 rounded-lg text-white"
                        >
                            Complete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default observer(Step4)
