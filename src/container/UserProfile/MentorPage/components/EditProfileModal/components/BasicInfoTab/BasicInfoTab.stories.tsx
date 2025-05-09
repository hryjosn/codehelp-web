import type { Meta, StoryObj } from '@storybook/react'
import BasicInfoTab from './BasicInfoTab'
import { fn } from '@storybook/test'
import { Tabs } from '../ui/tabs'

const meta = {
    title: 'UserProfile/MentorPage/EditProfileModal/BasicInfoTab',
    component: BasicInfoTab,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof BasicInfoTab>

export default meta
type Story = StoryObj<typeof meta>

const RenderBasicInfoTab = () => {
    return (
        <Tabs defaultValue="basic" className="w-full">
            <BasicInfoTab />
        </Tabs>
    )
}

export const Default: Story = {
    render: RenderBasicInfoTab,
}
