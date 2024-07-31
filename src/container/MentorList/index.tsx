import MentorCard from '~/components/mentor/MentorCard'
import { MOCK_MENTOR_LIST } from '~/container/MentorList/constant'

const MentorList = () => {
    return (
        <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {MOCK_MENTOR_LIST.map((mentor) => (
                <MentorCard mentor={mentor} key={mentor.id} />
            ))}
        </div>
    )
}

export default MentorList
