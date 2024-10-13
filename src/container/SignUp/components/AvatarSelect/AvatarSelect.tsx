import { runInAction } from 'mobx'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import rootStore from '~/store'
import compressImage from '~/utils/compressImage'

const AvatarSelect = () => {
    const [avatar, setAvatar] = useState<File | null>(null)
    const hiddenFileInput = useRef<HTMLInputElement | null>(null)
    const changeImage = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click()
        }
    }

    return (
        <div>
            {!avatar && (
                <div className="flex flex-col items-center gap-1">
                    <Image
                        alt="defaultUserAvatar"
                        src={'/Login/User.png'}
                        width={128}
                        height={128}
                        onClick={() => {
                            changeImage()
                        }}
                    />
                    <input
                        type="file"
                        name="myImage"
                        className="hidden"
                        ref={hiddenFileInput}
                        onChange={async (event) => {
                            if (event.target.files && event.target.files[0]) {
                                setAvatar(event.target.files[0])
                            }
                            const imageFile = await compressImage(event)
                            runInAction(() => {
                                if (imageFile) {
                                    rootStore.signUpStore.avatar[0] = imageFile
                                }
                            })
                        }}
                    />
                    <p className="min-h-6 text-center text-sm text-red-500">
                        Please select avatar
                    </p>
                </div>
            )}
            {avatar && (
                <div className="relative">
                    <Image
                        alt="userAvatar"
                        width={128}
                        height={128}
                        className="h-32 w-32 rounded-full"
                        src={URL.createObjectURL(avatar)}
                    ></Image>
                    <div
                        className="absolute right-0 top-0 h-5 w-5 cursor-pointer rounded-full bg-red-400 text-center"
                        onClick={() => {
                            setAvatar(null)
                            rootStore.signUpStore.avatar = []
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
