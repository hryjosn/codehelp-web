import Header from '~/components/Header/Header'
import MentorProfileSection from './components/MentorProfileSection/MentorProfileSection'

const MentorProfile = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const mentorId = (await params).id

    return (
        <>
            <Header />
            <MentorProfileSection mentorId={mentorId} />
        </>
    )
}

export default MentorProfile
