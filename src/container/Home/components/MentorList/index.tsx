'use client'
import FlatList from 'flatlist-react/lib'
import Link from 'next/link'
import { useMemo } from 'react'
import { MentorCard } from '~/components/mentor/MentorCard/MentorCard'
import { useGetMentors } from '~/container/api/Mentor'

const MentorList = () => {
    const { data, hasNextPage, fetchNextPage } = useGetMentors()
    const Mentors = useMemo(() => {
        return data?.pages.flatMap(({ data }) => {
            return data.mentorList
        })
    }, [data])

    return (
        <div>
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <FlatList
                    list={Mentors!}
                    renderItem={(mentor) => (
                        <Link
                            key={mentor.id}
                            href={`/mentor-profile/${mentor.id}`}
                        >
                            <MentorCard mentor={mentor} />
                        </Link>
                    )}
                    renderWhenEmpty={() => <div>List is empty!</div>}
                    hasMoreItems={hasNextPage}
                    loadMoreItems={fetchNextPage}
                />
            </div>
        </div>
    )
}

export default MentorList
