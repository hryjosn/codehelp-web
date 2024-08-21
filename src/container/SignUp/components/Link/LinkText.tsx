import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
export interface LinkProps {
    text: string
    href: string
    className: string
}
const LinkText = ({ text, href, className }: LinkProps) => {
    return (
        <Link
            href={href}
            className={classNames('underline font-bold', className)}
        >
            {text}
        </Link>
    )
}

export default LinkText
