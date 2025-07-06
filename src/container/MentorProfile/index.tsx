import Header from '~/components/Header/Header'
import MentorProfileSection from './components/MentorProfileSection/MentorProfileSection'
import { callGetMentorInfoHandler } from '~/api/mentor/mentorAPI'

const MentorProfile = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const mentorId = (await params).id
    const mentorInfoRes = await callGetMentorInfoHandler(mentorId)

    return (
        <>
            <Header />
            <MentorProfileSection
                mentorId={mentorId}
                mentorInfo={mentorInfoRes.mentor}
            />
        </>
    )
}

export default MentorProfile
