import type { Meta, StoryObj } from '@storybook/nextjs'
import ContactInfoTab from './ContactInfoTab'
import { Tabs } from '~/components/ui/tabs'

const meta = {
    title: 'UserProfile/MentorPage/EditProfileModal/ContactInfoTab',
    component: ContactInfoTab,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ContactInfoTab>

export default meta
type Story = StoryObj<typeof meta>

const RenderContactInfoTab = () => {
    return (
        <Tabs defaultValue="contact" className="w-full">
            <ContactInfoTab />
        </Tabs>
    )
}

export const Default: Story = {
    render: RenderContactInfoTab,
}
