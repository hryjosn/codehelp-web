import type { Meta, StoryObj } from '@storybook/nextjs'
import EditMemberProfileModal from './EditMemberProfileModal'
import { fn } from 'storybook/test'
import { useEditMemberProfileModalStore } from './store/EditMemberProfileModalStore'

const meta = {
    title: 'UserProfile/MemberPage/EditMemberProfileModal',
    component: EditMemberProfileModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onSave: fn(),
    },
    decorators: [
        (Story) => {
            useEditMemberProfileModalStore.setState({
                isOpen: true,
            })
            return <Story />
        },
    ],
} satisfies Meta<typeof EditMemberProfileModal>

export default meta
type Story = StoryObj<typeof meta>

const OpenModalButton = () => {
    const openModal = useEditMemberProfileModalStore((state) => state.openModal)
    return (
        <>
            <button onClick={openModal}>Open modal</button>
            <EditMemberProfileModal onSave={fn} />
        </>
    )
}

export const Default: Story = {
    args: {
        onSave: fn(),
    },
    render: OpenModalButton,
}
