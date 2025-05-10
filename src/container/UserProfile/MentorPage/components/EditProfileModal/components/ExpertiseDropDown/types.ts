import React from 'react'

export interface Props {
    htmlFor: string
    title: string
    value: string
    placeholder: string
    content: React.ReactNode
    required?: boolean
    onValueChange: (value: string) => void
}
