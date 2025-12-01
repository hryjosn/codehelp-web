import type { Meta, StoryObj } from '@storybook/react'
import EditMemberProfileModal from './EditMemberProfileModal'


import { useEditMemberProfileModalStore } from './store/EditMemberProfileModalStore'
import { UserForMember } from '~/api/user/types'
import { fn } from '@storybook/test'

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
