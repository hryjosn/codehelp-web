import Image from 'next/image'
import { IMentor } from '~/container/api/Mentor/types'
import type { Mentor } from '~/container/Home/components/MentorList/types'
import { EXPERIENCE } from './types'

type Props = {
    mentor: IMentor
}

const MentorCard = ({ mentor }: Props) => {
    const {
        avatar,
        userName,
        title,
        company,
        country,
        level,
        totalSessions = 31,
        totalReviews = 20,
    } = mentor

    return (
        <div className="flex h-full cursor-pointer flex-col rounded-2xl border border-solid border-stone-200 p-2">
            <div className="mb-2 h-64 w-full overflow-hidden rounded-xl">
                <Image
                    src={'/MentorList/mentor_1.jpg'}
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
                    <span className="mx-1 text-gray-500">at</span>
                    <span>{company}</span>
                </p>
                <p className="text-sm">
                    <span>{totalSessions} sessions</span>
                    <span className="ml-1 text-gray-500">
                        {totalReviews} reviews
                    </span>
                </p>
            </div>
            <div className="mt-auto flex justify-between rounded-lg bg-zinc-50 p-3 text-xs text-stone-500">
                <div>
                    <p>Experience</p>
                    <p className="text-sm font-bold text-cyan-950">
                        {EXPERIENCE[level]}
                    </p>
                </div>
                <div>
                    <p>Avg. Attendance</p>
                    <p className="text-sm font-bold text-cyan-950">100%</p>
                </div>
            </div>
        </div>
    )
}

export { MentorCard }
