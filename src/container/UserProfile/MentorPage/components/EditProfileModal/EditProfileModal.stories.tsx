import type { Meta, StoryObj } from '@storybook/nextjs'
import EditProfileModal from './EditProfileModal'
import { fn } from 'storybook/test'
import { useEditProfileModalStore } from './store/EditProfileModalStore'
import type { UserForMentor } from '~/api/user/types'

const meta = {
    title: 'UserProfile/MentorPage/EditProfileModal',
    component: EditProfileModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onSave: fn<(data: UserForMentor) => void>(),
    },
    decorators: [
        (Story) => {
            useEditProfileModalStore.setState({
                isOpen: true,
            })
            return <Story />
        },
    ],
} satisfies Meta<typeof EditProfileModal>

export default meta
type Story = StoryObj<typeof meta>

const OpenModalButton = (args: { onSave: (data: UserForMentor) => void }) => {
    const openModal = useEditProfileModalStore((state) => state.openModal)
    return (
        <>
            <button onClick={openModal}>Open modal</button>
            <EditProfileModal onSave={args.onSave} />
        </>
    )
}

export const Default: Story = {
    args: {
        onSave: fn(),
    },
    render: OpenModalButton,
}
