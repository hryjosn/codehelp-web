import type { Meta, StoryObj } from '@storybook/nextjs'
import ExpertiseDropDown from './ExpertiseDropDown'
import { fn } from 'storybook/test'
import React from 'react'
import { useEditProfileModalStore } from '../../store/EditProfileModalStore'
import { selectChange } from '~/container/UserProfile/MentorPage/utils'
import expertiseList from '~/constant/data/expertise.json'
import { SelectItem } from '~/components/ui/select'

const meta = {
    title: 'UserProfile/MentorPage/EditProfileModal/ExpertiseDropDown',
    component: ExpertiseDropDown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        title: '',
        htmlFor: '',
        value: '',
        onValueChange: fn(),
        required: true,
        placeholder: 'Select primary expertise',
        content: <></>,
    },
} satisfies Meta<typeof ExpertiseDropDown>

export default meta
type Story = StoryObj<typeof meta>

const RenderExpertiseDropDown = () => {
    const newMentorInfo = useEditProfileModalStore(
        (state) => state.newMentorInfo
    )
    return (
        <ExpertiseDropDown
            title="Primary Expertise"
            htmlFor="primaryExpertise"
            value={newMentorInfo.primaryExpertise}
            onValueChange={(value) =>
                selectChange({
                    name: 'primaryExpertise',
                    value,
                })
            }
            required
            placeholder="Select primary expertise"
            content={
                <>
                    {expertiseList.map((expertise) => (
                        <SelectItem key={expertise} value={expertise}>
                            {expertise}
                        </SelectItem>
                    ))}
                </>
            }
        />
    )
}

export const Default: Story = {
    render: RenderExpertiseDropDown,
}
