import type { Meta, StoryObj } from '@storybook/react'
import UploadAvatar from './UploadAvatar'
import { fn } from '@storybook/test'
import { useEditProfileModalStore } from '../EditProfileModal/store/EditProfileModalStore'
import { avatarChange } from '../../utils'

const meta = {
    title: 'UserProfile/MentorPage/UploadAvatar',
    component: UploadAvatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        avatarPreview: '',
        userName: 'test1',
        onChange: fn(),
    },
} satisfies Meta<typeof UploadAvatar>

export default meta
type Story = StoryObj<typeof meta>

const RenderUploadAvatar = () => {
    const avatarPreview = useEditProfileModalStore(
        (state) => state.avatarPreview
    )
    const newUserInfo = useEditProfileModalStore((state) => state.newUserInfo)

    return (
        <UploadAvatar
            userName={newUserInfo.userName}
            avatarPreview={avatarPreview}
            onChange={avatarChange}
        />
    )
}

export const Default: Story = {
    args: {
        avatarPreview: '',
        userName: 'test1',
        onChange: fn(),
    },
    render: RenderUploadAvatar,
}
