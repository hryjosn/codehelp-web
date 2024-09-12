'use client'
import { useRouter } from 'next/navigation'
import Booking from '~/components/Booking'
import Bio from '~/components/mentor/Bio'
import Education from '~/components/mentor/Education'
import Experience from '~/components/mentor/Experience'
import { MOCK_MENTOR_LIST } from '~/container/Home/components/MentorList/constant'
import type { Mentor } from '~/container/Home/components/MentorList/types'

const MentorProfile = ({ params }: { params: { id: string } }) => {
    const currentMentor: Mentor | undefined = MOCK_MENTOR_LIST.find(
        (mentor) => mentor.id === Number(params.id)
    )

    const router = useRouter()
    if (!currentMentor) {
        router.back()
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
            <div className="mt-6 flex flex-col gap-6 border-t border-solid border-gray-200 pt-6 md:flex-row md:gap-32">
                <div className="flex flex-1 flex-col gap-4 p-6">
                    <p className="line-clamp-3">{currentMentor.bio}</p>
                    <Experience experiences={currentMentor.experience} />
                    <Education education={currentMentor.education} />
                </div>
                <Booking />
            </div>
        </div>
    )
}

export default MentorProfile
