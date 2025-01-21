import type { Meta, StoryObj } from '@storybook/react'
import ButtonGrid from './ButtonGrid'

const meta = {
    title: 'ScheduleSetting/Components/ButtonGrid',
    component: ButtonGrid,
    parameters: {
        layout: 'centered',
        arg: { onClick: () => {} },
    },
} satisfies Meta<typeof ButtonGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: { variant: 'primary' },
    render: () => {
        return (
            <div>
                <div className="flex w-40">
                    <ButtonGrid variant={'primary'} />
                    <ButtonGrid variant={'primary'} />
                    <ButtonGrid variant={'secondary'} />
                </div>
                <div className="flex w-40">
                    <ButtonGrid variant={'primary'} />
                    <ButtonGrid variant={'secondary'} />
                    <ButtonGrid variant={'primary'} />
                </div>
                <div className="flex w-40">
                    <ButtonGrid variant={'primary'} />
                    <ButtonGrid variant={'secondary'} />
                    <ButtonGrid variant={'primary'} />
                </div>
            </div>
        )
    },
}
export const Selected: Story = {
    args: { variant: 'primary', className: 'w-20' },
}
export const NotSelected: Story = {
    args: { variant: 'secondary', className: 'w-20' },
}
