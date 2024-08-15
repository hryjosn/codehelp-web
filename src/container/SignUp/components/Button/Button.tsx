import classNames from 'classnames'
import React from 'react'

export interface ButtonProps {
    text: string
    validation: boolean
    onClick: () => void
}
const Input = ({ text, validation, onClick }: ButtonProps) => {
    return (
        <button
            className={classNames(
                {
                    'bg-slate-800 hover:bg-slate-700': validation,
                },
                {
                    'bg-gray-400': !validation,
                },
                ' text-white p-3 rounded-full min-w-40'
            )}
            onClick={onClick}
            disabled={!validation}
        >
            {text}
        </button>
    )
}

export default Input
