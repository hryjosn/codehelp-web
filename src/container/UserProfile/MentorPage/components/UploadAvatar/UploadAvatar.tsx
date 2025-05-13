'use client'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '../EditProfileModal/components/ui/avatar'
import { Props } from './types'

const UploadAvatar = ({ avatarPreview, userName, onChange }: Props) => {
    return (
        <div className="flex flex-col items-center">
            <label htmlFor="uploadPic">
                <Avatar className="mb-2 h-24 w-24">
                    <AvatarImage
                        src={avatarPreview || '/Avatar/defaultAvatar.jpg'}
                        alt={userName}
                    />
                    <AvatarFallback>
                        {userName?.charAt(0) || 'U'}
                    </AvatarFallback>
                </Avatar>
            </label>
            <div className="flex items-center gap-2">
                <input
                    id="uploadPic"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default UploadAvatar
