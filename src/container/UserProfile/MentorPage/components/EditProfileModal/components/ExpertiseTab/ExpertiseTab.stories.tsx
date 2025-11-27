import type { Meta, StoryObj } from '@storybook/nextjs'
import ExpertiseTab from './ExpertiseTab'
import { Tabs } from '~/components/ui/tabs'

const meta = {
    title: 'UserProfile/MentorPage/EditProfileModal/ExpertiseTab',
    component: ExpertiseTab,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ExpertiseTab>

export default meta
type Story = StoryObj<typeof meta>

const RenderContactInfoTab = () => {
    return (
        <Tabs defaultValue="expertise" className="w-full">
            <ExpertiseTab />
        </Tabs>
    )
}

export const Default: Story = {
    render: RenderContactInfoTab,
}
