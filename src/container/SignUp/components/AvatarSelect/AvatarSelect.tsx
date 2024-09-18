import Image from 'next/image'
import React, { useRef, useState } from 'react'

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
                <div>
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
                        onChange={(event) => {
                            if (event.target.files && event.target.files[0]) {
                                setAvatar(event.target.files[0])
                            }
                        }}
                    />
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
                        className="absolute right-0 top-0 h-5 w-5 cursor-pointer rounded-full bg-red-500 text-center"
                        onClick={() => setAvatar(null)}
                    >
                        X
                    </div>
                </div>
            )}
        </div>
    )
}
export default AvatarSelect
