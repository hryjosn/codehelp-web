'use client'
import { usePathname, useRouter } from 'next/navigation'
import type { Mentor } from '~/container/MentorList/types'
import { MOCK_MENTOR_LIST } from '~/container/MentorList/constant'
import Booking from '~/components/Booking'
import Bio from '~/components/mentor/Bio'
import Experience from '~/components/mentor/Experience'

const MentorProfile = () => {
    const pathname = usePathname()
    const splitPathname = pathname.split('/')
    const currentMentor: Mentor | undefined = MOCK_MENTOR_LIST.find(
        (mentor) => mentor.slug === splitPathname[splitPathname.length - 1]
    )

    const router = useRouter()
    if (!currentMentor) {
        router.push('/mentor-list')
        return
    }

    return (
        <div className="p-6 md:p-16">
            <Bio
                avatar={currentMentor.avatar}
                name={currentMentor.name}
                company={currentMentor.company}
                title={currentMentor.title}
            />
            <div className="mt-6 pt-6 flex flex-col gap-6 border-t border-solid border-gray-200 md:flex-row md:gap-32">
                <div className="p-2 flex flex-col flex-1 gap-4 border-solid border border-sky-500">
                    <p className="line-clamp-3">{currentMentor.bio}</p>
                    <Experience experiences={currentMentor.experience} />
                </div>
                <Booking />
            </div>
        </div>
    )
}

export default MentorProfile
