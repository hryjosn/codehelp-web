'use client'

import { useTranslations } from 'next-intl'

const DefaultChattingArea = () => {
    const t = useTranslations('Chat')

    return (
        <div className="flex min-w-[300px] flex-1 flex-col items-center justify-center px-5 py-5 text-xl">
            <p className="font-bold text-gray-500">
                {t('looking_for_some_mentors_to')}
            </p>
            <p className="font-bold text-gray-500">
                {t('discuss_your_problems_together')}
            </p>
        </div>
    )
}

export default DefaultChattingArea
