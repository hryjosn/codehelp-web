import Link from 'next/link'
import React from 'react'
import { LinkTextT } from './types'

const LinkText = ({ value, href }: LinkTextT) => {
    return (
        <Link href={href} className="underline font-bold">
            <span>{value}</span>
        </Link>
    )
}

export default LinkText
