import type { Meta, StoryObj } from '@storybook/react'
import EditMemberProfileModal from './EditMemberProfileModal'
import { fn } from 'vitest'
import type { UserForMember } from '~/types/yourUserTypeFile' // 請根據實際 UserForMember 型別路徑調整
import { useEditMemberProfileModalStore } from './store/EditMemberProfileModalStore'

const meta = {
    title: 'UserProfile/MemberPage/EditMemberProfileModal',
    component: EditMemberProfileModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onSave: fn<(data: UserForMember) => void>(),
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

const OpenModalButton = (args: { onSave: (data: UserForMember) => void }) => {
    const openModal = useEditMemberProfileModalStore((state) => state.openModal)
    return (
        <>
            <button onClick={openModal}>Open modal</button>
            <EditMemberProfileModal onSave={args.onSave} />
        </>
    )
}

export const Default: Story = {
    args: {
        onSave: fn<(data: UserForMember) => void>(),
    },
    render: OpenModalButton,
}
