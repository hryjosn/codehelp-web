import type { Meta, StoryObj } from '@storybook/nextjs'
import EditProfileModal from './EditProfileModal'
import { fn } from 'storybook/test'
import { useEditProfileModalStore } from './store/EditProfileModalStore'

const meta = {
    title: 'UserProfile/MentorPage/EditProfileModal',
    component: EditProfileModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onSave: fn(),
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

const OpenModalButton = () => {
    const openModal = useEditProfileModalStore((state) => state.openModal)
    return (
        <>
            <button onClick={openModal}>Open modal</button>
            <EditProfileModal onSave={fn} />
        </>
    )
}

export const Default: Story = {
    args: {
        onSave: fn(),
    },
    render: OpenModalButton,
}
