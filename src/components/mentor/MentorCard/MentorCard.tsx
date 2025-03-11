import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { MentorT } from '~/api/mentor/types'

type Props = {
    mentor: MentorT
}

const MentorCard = ({ mentor }: Props) => {
    const { avatar, userName, title, company, country } = mentor
    const t = useTranslations('MentorCard')
    return (
        <div className="flex h-full cursor-pointer flex-col rounded-2xl border border-solid border-stone-200 p-2">
            <div className="mb-2 h-64 w-full overflow-hidden rounded-xl">
                <Image
                    src={avatar}
                    alt={userName}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="mb-4 flex flex-col gap-2 text-slate-800">
                <div className="flex gap-1">
                    <p className="truncate font-semibold">{userName}</p>
                    <span>{country}</span>
                </div>
                <p className="line-clamp-2 text-sm">
                    <span>{title}</span>
                    <span className="ml-1 text-gray-500">@</span>
                    <span>{company}</span>
                </p>
            </div>
            <div className="mt-auto flex justify-between rounded-lg bg-zinc-50 p-3 text-xs text-stone-500">
                <div>
                    <p>{t('avg-attendance')}</p>
                    <p className="text-sm font-bold text-cyan-950">100%</p>
                </div>
            </div>
        </div>
    )
}

export { MentorCard }
