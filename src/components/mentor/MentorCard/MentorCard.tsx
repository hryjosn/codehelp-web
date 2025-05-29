import Image from 'next/image'

import { MentorT } from '~/api/mentor/types'

type Props = {
    mentor: MentorT
}

const MentorCard = ({ mentor }: Props) => {
    const { avatar, userName, title, company, country } = mentor

    return (
        <div className="flex h-full cursor-pointer flex-col rounded-2xl border border-solid border-stone-200 p-2">
            <div className="mb-2 h-64 w-full overflow-hidden rounded-xl">
                <Image
                    src={avatar}
                    alt={userName}
                    width={0}
                    height={0}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
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
        </div>
    )
}

export { MentorCard }
