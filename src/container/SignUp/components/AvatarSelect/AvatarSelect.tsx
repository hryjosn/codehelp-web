import { runInAction } from 'mobx'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import rootStore from '~/store'
import compressImage from '~/utils/compressImage'

export type FormAvatarSelectProps = {
    registerName: string
}

const AvatarSelect = ({ registerName, ...props }: FormAvatarSelectProps) => {
    const [compressedAvatar, setCompressedAvatar] = useState<File | null>(null)
    const FileInput = useRef<HTMLInputElement | null>(null)
    const {
        control,
        setValue,
        formState: { errors },
    } = useFormContext()

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files && event.target.files[0]) {
            const compressedImage = await compressImage(event)
            console.log('Compressed image file:', compressedImage)
            console.log('typeof compressedImage', typeof compressedImage)
            if (compressedImage) {
                setCompressedAvatar(compressedImage)
                runInAction(() => {
                    rootStore.signUpStore.avatar[0] = compressedImage
                })
                setValue(registerName, compressedImage)
            }
        }
    }

    const changeImage = () => {
        if (FileInput.current) {
            FileInput.current.click()
        }
    }
    console.log(errors)
    return (
        <div>
            {!compressedAvatar && (
                <div className="flex flex-col items-center gap-1">
                    <Image
                        alt="defaultUserAvatar"
                        src={'/Login/User.png'}
                        width={192}
                        height={192}
                        onClick={changeImage}
                    />
                    <Controller
                        name={registerName}
                        control={control}
                        defaultValue={''}
                        render={({ field }) => (
                            <input
                                type="file"
                                className="hidden"
                                ref={FileInput}
                                onChange={(event) => {
                                    field.onChange(event)
                                    handleFileChange(event)
                                }}
                                {...props}
                            />
                        )}
                    />
                    <p className="min-h-6 text-center text-sm text-red-500">
                        Please select avatar
                    </p>
                </div>
            )}
            {compressedAvatar && (
                <div className="relative">
                    <Image
                        alt="userAvatar"
                        width={192}
                        height={192}
                        className="h-48 w-48 rounded-full object-cover"
                        src={URL.createObjectURL(compressedAvatar)}
                    />
                    <div
                        className="absolute right-0 top-0 h-5 w-5 cursor-pointer rounded-full bg-red-400 text-center"
                        onClick={() => {
                            setCompressedAvatar(null)
                            rootStore.signUpStore.avatar = []
                            setValue(registerName, null)
                        }}
                    >
                        X
                    </div>
                </div>
            )}
        </div>
    )
}

export default AvatarSelect
