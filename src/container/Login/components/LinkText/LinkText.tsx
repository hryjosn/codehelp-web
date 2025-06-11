import { Link } from '~/i18n/routing'
import React from 'react'
import { LinkTextT } from './types'

const LinkText = ({ value, href }: LinkTextT) => {
    return (
        <Link href={href} className="font-bold underline text-sm md:text-base">
            <span>{value}</span>
        </Link>
    )
}

export default LinkText
