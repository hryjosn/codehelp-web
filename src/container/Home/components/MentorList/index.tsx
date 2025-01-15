'use client'
import Link from 'next/link'
import { useMemo } from 'react'
import { useGetMentorList } from '~/api/mentor/mentor'
import { MentorCard } from '~/components/mentor/MentorCard/MentorCard'

const MentorList = () => {
    const { data: mentorListData } = useGetMentorList()
    const mentorList = useMemo(() => {
        const queriedMentorList = mentorListData?.pages.flatMap(
            (page) => page.mentorList
        )
        return queriedMentorList
    }, [mentorListData])
    return (
        <div>
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {mentorList &&
                    mentorList.map((mentor) => (
                        <Link
                            key={mentor.id}
                            href={`/mentor-profile/${mentor.id}`}
                        >
                            <MentorCard mentor={mentor} />
                        </Link>
                    ))}
            </div>
        </div>
    )
}

export default MentorList
