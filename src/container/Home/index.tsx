import { getMentorList } from '~/api/mentor/mentor'
import Header from '~/components/Header/Header'
import { MentorCard } from '~/components/mentor/MentorCard/MentorCard'
import Pagination from './components/Pagination'
import { Link } from '~/i18n/routing'
const PAGE_SIZE = 10
const Home = async (props: {
    searchParams?: Promise<{
        page?: string
    }>
}) => {
    const params = await props.searchParams
    const pageParam = params?.page ? Number(params?.page) : 1
    const data = await getMentorList({
        pageParam: pageParam,
        pageSize: PAGE_SIZE,
    })

    const mentorList = data.mentorList
    const total = data.total

    return (
        <div className="flex h-full flex-col">
            <Header />
            <div className="flex flex-1 flex-col justify-between">
                <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {mentorList?.map((mentor) => (
                        <Link
                            key={mentor.id}
                            href={`/mentor-profile/${mentor.id}`}
                        >
                            <MentorCard mentor={mentor} />
                        </Link>
                    ))}
                </div>
                <div className="mb-4 self-center">
                    <Pagination count={Math.ceil(total / PAGE_SIZE)} />
                </div>
            </div>
        </div>
    )
}

export default Home
