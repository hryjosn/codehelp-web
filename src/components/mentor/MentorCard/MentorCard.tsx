import Image from 'next/image'
import type { Mentor } from '~/container/Home/components/MentorList/types'

type Props = {
    mentor: Mentor
}

const MentorCard = ({ mentor }: Props) => {
    const {
        avatar,
        name,
        title,
        company,
        country,
        yearOfExperience,
        totalSessions,
        totalReviews,
    } = mentor

    return (
        <div className="h-full flex flex-col p-2 border border-solid border-stone-200 rounded-2xl cursor-pointer">
            <div className="overflow-hidden h-64 w-full rounded-xl mb-2">
                <Image
                    src={avatar}
                    alt={name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div className="flex flex-col gap-2 text-slate-800 mb-4">
                <div className="flex gap-1">
                    <p className="font-semibold	truncate">{name}</p>
                    <span>{country}</span>
                </div>
                <p className="text-sm line-clamp-2">
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
            <div className="flex justify-between rounded-lg	bg-zinc-50 mt-auto p-3 text-xs text-stone-500">
                <div>
                    <p>Experience</p>
                    <p className="text-sm text-cyan-950 font-bold">
                        {yearOfExperience}
                    </p>
                </div>
                <div>
                    <p>Avg. Attendance</p>
                    <p className="text-sm text-cyan-950 font-bold">100%</p>
                </div>
            </div>
        </div>
    )
}

export { MentorCard }
