import type { Meta, StoryObj } from '@storybook/nextjs'
import BackgroundContent from './BackgroundContent'
import BackgroundItem from './components/BackgroundItem/BackgroundItem'

const mockDataList = ['Business Administration', 'Design', 'Biology']

const meta = {
    title: 'MentorProfile/Components/BackgroundContent',
    component: BackgroundContent,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof BackgroundContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: 'Education',
        content: <></>,
    },
    render: () => {
        return (
            <BackgroundContent
                title={'Expertise'}
                content={mockDataList.map((data, index) => (
                    <BackgroundItem key={index} data={data} />
                ))}
            />
        )
    },
}
