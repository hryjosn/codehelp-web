import { Link } from '~/i18n/routing'
import { BsLinkedin } from 'react-icons/bs'
import { getMentorInfo } from '~/api/mentor/mentor'
import Header from '~/components/Header/Header'
import Bio from '~/components/mentor/Bio'
import Education from '~/components/mentor/Education'
import Experience from '~/components/mentor/Experience'
import { BackgroundItem } from './components/BackgroundItem/BackgroundItem'
import Booking from './components/Booking/Booking'
import CommunicationSection from './components/CommunicationSection/CommunicationSection'

const MentorProfile = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const mentorId = (await params).id
    const mentorInfo = await getMentorInfo(mentorId)

    return (
        <>
            <Header />
            <div className="p-6 md:p-16">
                <Bio
                    avatar={mentorInfo.avatar}
                    name={mentorInfo.userName}
                    company={mentorInfo.company}
                    title={mentorInfo.title}
                    country={mentorInfo.country}
                />
                <div className="flex justify-end gap-5">
                    <CommunicationSection mentorId={mentorId} />
                </div>
                <div className="mt-6 flex flex-col items-start gap-4 border-t border-solid border-gray-200 pt-6 lg:flex-row lg:gap-32">
                    <div className="flex flex-1 flex-col gap-4 px-6">
                        <p className="line-clamp-3 font-bold">
                            {mentorInfo.introduction}
                        </p>
                        <div>
                            <Link
                                href={mentorInfo.url}
                                target="_blank"
                                className="inline-flex"
                            >
                                <BsLinkedin
                                    size={'25'}
                                    className="text-blue-600"
                                />
                            </Link>
                        </div>
                        <p className="text-lg font-bold">Background</p>
                        <div className="rounded-xl border border-solid border-gray-200 px-5 py-2">
                            <BackgroundItem
                                title={'Expertise'}
                                content={[
                                    mentorInfo.primaryExpertise,
                                    mentorInfo.secondaryExpertise,
                                    mentorInfo.tertiaryExpertise,
                                ]}
                            />
                            <BackgroundItem
                                title={'Disciplines'}
                                content={mentorInfo.mentorDisciplines}
                            />
                        </div>
                        {mentorInfo.experience.length > 0 && (
                            <Experience experiences={mentorInfo.experience} />
                        )}

                        <Education educationProps={mentorInfo.education} />
                    </div>
                    <div className="px-6 lg:px-0">
                        <Booking mentorId={mentorInfo.id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MentorProfile
