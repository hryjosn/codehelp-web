import React from 'react'

export interface Props {
    className: string
    title: string | React.ReactNode
    onClick: () => void
}
