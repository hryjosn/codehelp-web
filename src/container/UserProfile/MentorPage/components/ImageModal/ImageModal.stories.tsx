import type { Meta, StoryObj } from '@storybook/nextjs'
import ImageModal from './ImageModal'
import { useImageModalStore } from './store/ImageModalStore'

const meta = {
    title: 'UserProfile/MentorPage/ImageModal',
    component: ImageModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => {
            useImageModalStore.setState({
                isOpen: true,
                imageURL:
                    'https://codehelp-backend-production.up.railway.app/image/eb658587-7fa9-4880-a1a2-dfcd3d993102',
            })
            return <Story />
        },
    ],
} satisfies Meta<typeof ImageModal>

const OpenModalButton = () => {
    const openModal = useImageModalStore((state) => state.openModal)
    return (
        <>
            <button onClick={openModal}>Open modal</button>
            <ImageModal />
        </>
    )
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: OpenModalButton,
}
