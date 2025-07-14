import { Metadata } from 'next'
import { callGetMentorInfoHandler } from '~/api/mentor/mentorAPI'

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id: mentorId } = await params

    const { mentor: mentorInfo } = await callGetMentorInfoHandler(mentorId)

    return {
        title: mentorInfo.userName,
    }
}
export { default } from '~/container/MentorProfile'
