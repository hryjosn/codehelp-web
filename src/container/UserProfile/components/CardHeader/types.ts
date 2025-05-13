import React from 'react'

export interface Props {
    className: string
    title: string | React.ReactNode
    isButtonVisible?: boolean
    onClick?: () => void
}
