import type { Meta, StoryObj } from '@storybook/nextjs'
import TimeZoneGrid from './TimeZoneGrid'

const meta = {
    title: 'Appointment/Components/TimeZoneGrid',
    component: TimeZoneGrid,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof TimeZoneGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
