import type { Meta, StoryObj } from '@storybook/nextjs'
import LoadingModal from './LoadingModal'

const meta = {
    title: 'LoadingModal',
    component: LoadingModal,
    parameters: {
        layout: 'centered',
    },

    args: {
        visible: true,
    },
} satisfies Meta<typeof LoadingModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        visible: true,
    },
}
