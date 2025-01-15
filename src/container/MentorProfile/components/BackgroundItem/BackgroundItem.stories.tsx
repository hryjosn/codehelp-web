import type { Meta, StoryObj } from '@storybook/react'
import { BackgroundItem } from './BackgroundItem'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'MentorProfile/Components/BackgroundItem',
    component: BackgroundItem,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],

    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof BackgroundItem>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        title: 'Education',
        content: ['海事資訊科技系', '高雄科技大學'],
    },
    render: () => {
        return (
            <div className="rounded-xl border border-solid border-gray-200 px-5 py-2">
                <BackgroundItem
                    title={'Expertise'}
                    content={['Backend Development', 'Data Science']}
                />
                <BackgroundItem
                    title={'Disciplines'}
                    content={['Business Administration', 'Design', 'Biology']}
                />
            </div>
        )
    },
}
