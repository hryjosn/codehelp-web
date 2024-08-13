import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Input from '~/components/Input'
import countryList from '~/constant/data/countries.json'
import rootStore from '~/store'
import Image from 'next/image'
const Step1 = () => {
    const router = useRouter()
    const [country, setCountry] = useState<string>('')
    const {
        setUpStore: { userName, country: Country },
    } = rootStore
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            userName,
            country: Country,
        },
    })

    const onSubmit = ({ userName, country }: studentStep1T) => {
        runInAction(() => {
            rootStore.setUpStore.userName = userName
            rootStore.setUpStore.country = country
        })
        router.push('./step2')
    }

    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col shadow-lg p-10 rounded-xl gap-10">
                <div className="text-3xl font-bold">
                    Hello! What’s your origin story?
                </div>
                <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Image
                        alt="userAvatar"
                        src={'/Login/UserAvatar.png'}
                        width={120}
                        height={120}
                        className="self-center cursor-pointer"
                    />
                    <div className="flex flex-col gap-2">
                        UserName
                        <Controller
                            name="userName"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: '必填選項',
                                },
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.userName && (
                            <span className="text-red-500">
                                {errors.userName.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        Country
                        <Controller
                            name="country"
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
                                    value={country || Country}
                                    onChange={(e) => {
                                        setCountry(e.target.value as string)
                                        field.onChange(e)
                                    }}
                                    input={<OutlinedInput />}
                                    className="h-12 rounded-lg"
                                >
                                    {countryList.map((country, index) => (
                                        <MenuItem
                                            key={index}
                                            value={country.name}
                                        >
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.country && (
                            <span className="text-red-500">
                                {errors.country.message}
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
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default observer(Step1)
