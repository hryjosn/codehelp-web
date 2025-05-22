import type { Meta, StoryObj } from '@storybook/react'
import EditSelectOptionModal from './EditSelectOptionModal'
import disciplineList from '~/constant/data/disciplines.json'
import { useEditSelectOptionModalStore } from './store/EditSelectOptionModalStore'

const meta = {
    title: 'UserProfile/MentorPage/EditSelectOptionModal',
    component: EditSelectOptionModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {},
    decorators: [
        (Story) => {
            useEditSelectOptionModalStore.setState({
                isOpen: true,
                dataList: disciplineList,
            })
            return <Story />
        },
    ],
} satisfies Meta<typeof EditSelectOptionModal>

export default meta
type Story = StoryObj<typeof meta>

const OpenModalButton = () => {
    const openModal = useEditSelectOptionModalStore((state) => state.openModal)
    const setDataList = useEditSelectOptionModalStore(
        (state) => state.setDataList
    )
    const setTitle = useEditSelectOptionModalStore((state) => state.setTitle)
    const setSubmitFunction = useEditSelectOptionModalStore(
        (state) => state.setSubmitFunction
    )

    const disciplinesUpdate = (state: string[]) => {
        console.log('update disciplines', state)
    }
    return (
        <>
            <button
                onClick={() => {
                    openModal()
                    setDataList(disciplineList)
                    setTitle('Disciplines')
                    setSubmitFunction(disciplinesUpdate)
                }}
            >
                Open modal
            </button>
            <EditSelectOptionModal />
        </>
    )
}

export const Default: Story = {
    render: OpenModalButton,
}
