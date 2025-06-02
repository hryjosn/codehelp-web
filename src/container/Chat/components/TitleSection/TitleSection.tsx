'use client'

import { useTranslations } from 'next-intl'
import BackButton from '~/components/BackButton/BackButton'

const TitleSection = () => {
    const t = useTranslations('Chat')
    return (
        <div className="flex">
            <div className="mr-3 flex items-center">
                <BackButton />
            </div>
            <p className="text-xl font-bold">{t('messages')}</p>
        </div>
    )
}

export default TitleSection
