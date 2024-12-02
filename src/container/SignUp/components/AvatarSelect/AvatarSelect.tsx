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
    const { control, setValue } = useFormContext()

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files && event.target.files[0]) {
            const compressedImage = await compressImage(event)
            if (compressedImage) {
                setCompressedAvatar(compressedImage)
                setValue(registerName, compressedImage)
            }
        }
    }

    const changeImage = () => {
        if (FileInput.current) {
            FileInput.current.click()
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center gap-1">
                <Image
                    alt="defaultUserAvatar"
                    src={
                        compressedAvatar
                            ? URL.createObjectURL(compressedAvatar)
                            : '/Login/User.png'
                    }
                    className="h-40 w-40 rounded-full object-cover"
                    width={160}
                    height={160}
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
                    {compressedAvatar
                        ? 'Click to change avatar'
                        : 'Please select avatar'}
                </p>
            </div>
        </div>
    )
}

export default AvatarSelect
