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
            <div className="mt-6 pt-6 flex flex-col gap-6 border-t border-solid border-gray-200 md:flex-row">
                <div className="p-2 flex flex-col gap-4 border-solid border border-sky-500 flex-1">
                    <p className="line-clamp-3">
                        Vamsi Yarlagadda possesses extensive expertise in development and solution design, backed by over 15 years of professional experience. He adeptly crafts technical solutions utilizing a diverse array of programming languages and technologies such as SAP, SuccessFactors, HR and cloud HR applications, C/C++, SQL, Python, and TOGAF (Enterprise Architecture). With a background in Computer Science and multiple certifications like SAP, SuccessFactors, TOGAF architect, proficiency certifications in Python, C, and C++, he is well-equipped to tackle complex challenges.
                    </p>
            <Bio
                avatar={currentMentor.avatar}
                name={currentMentor.name}
                company={currentMentor.company}
                title={currentMentor.title}
            />
                </div>
                <Booking />
            </div>
        </div>
    )
}

export default MentorProfile
