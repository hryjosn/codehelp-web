import classNames from 'classnames'
import React from 'react'

export interface ButtonProps {
    text: string
    errors: object
    props?: any
}
const Button = ({ text, errors, props }: ButtonProps) => {
    return (
        <button
            type="submit"
            className={classNames(
                {
                    'bg-slate-800 hover:bg-slate-700':
                        Object.keys(errors).length === 0,
                },
                {
                    'bg-gray-400': Object.keys(errors).length !== 0,
                },
                'text-white p-3 rounded-full w-40'
            )}
            disabled={Object.keys(errors).length !== 0}
            {...props}
        >
            {text}
        </button>
    )
}

export default Button
