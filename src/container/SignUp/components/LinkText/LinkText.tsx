import React from 'react'
import Link from 'next/link'
interface LinkProps {
    text: string
    href: string
}
const LinkText = ({ text, href }: LinkProps) => {
    return (
        <Link href={href} className={'underline font-bold'}>
            {text}
        </Link>
    )
}

export default LinkText
