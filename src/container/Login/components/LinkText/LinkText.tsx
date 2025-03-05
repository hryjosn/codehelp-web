import { Link } from '~/i18n/routing'
import React from 'react'
import { LinkTextT } from './types'

const LinkText = ({ value, href }: LinkTextT) => {
    return (
        <Link href={href} className="font-bold underline">
            <span>{value}</span>
        </Link>
    )
}

export default LinkText
