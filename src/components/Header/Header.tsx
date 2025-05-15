import { FC } from 'react'

import Image from 'next/image'
import { Link } from '~/i18n/routing'
import HeaderSection from './components/HeaderSection'

const Header: FC = () => {
    return (
        <div className="flex items-center justify-between border-b border-gray-100 px-8 py-2 shadow-md">
            <Link className="flex items-center" href="/">
                <Image
                    src="/Logo/codehelp_logo.png"
                    alt=""
                    width={50}
                    height={50}
                />
                <p className="text-xl font-bold">Codehelp</p>
            </Link>
            <HeaderSection />
        </div>
    )
}
export default Header
