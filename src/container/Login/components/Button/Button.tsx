import classNames from 'classnames'
import React from 'react'
import { ButtonT } from './types'

const Button = (props: ButtonT) => {
    const { title, errors } = props

    return (
        <button
            className={classNames(
                'text-white p-3 rounded-full mt-5 bg-gray-400 min-w-40',
                {
                    'bg-slate-800 hover:bg-slate-700':
                        Object.keys(errors).length === 0,
                }
            )}
            disabled={Object.keys(errors).length !== 0}
        >
            {title}
        </button>
    )
}

export default Button
