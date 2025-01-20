import { IoIosRemoveCircle } from 'react-icons/io'
import React from 'react'
import { Props } from './types'

const ImageWithButton = ({ onClick, children }: Props) => {
    return (
        <div className="relative flex items-start">
            <button onClick={onClick} className="absolute right-0 top-0">
                <IoIosRemoveCircle color="red" />
            </button>
            {children}
        </div>
    )
}

export default ImageWithButton
