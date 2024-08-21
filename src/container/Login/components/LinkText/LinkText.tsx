import Link from 'next/link'
import React from 'react'
import { LinkTextT } from './types'

const LinkText = ({ children, href }: LinkTextT) => {
    return (
        <Link href={href} className="underline font-bold">
            {children}
        </Link>
    )
}

export default LinkText
