import Header from '~/components/Header/Header'
import { callGetMentorInfoHandler } from '~/api/mentor/mentorAPI'
import Bio from '~/components/mentor/Bio'
import CommunicationSection from './components/CommunicationSection/CommunicationSection'
import { Link } from '~/i18n/routing'
import { BsLinkedin } from 'react-icons/bs'
import Education from '~/components/mentor/Education'
import Experience from '~/components/mentor/Experience'
import BackgroundItem from './components/BackgroundContent/components/BackgroundItem/BackgroundItem'
import BackgroundContent from './components/BackgroundContent/BackgroundContent'
import Booking from './components/Booking/Booking'
import { Separator } from '~/components/ui/separator'

const MentorProfile = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const mentorId = (await params).id
    const { mentor: mentorInfo } = await callGetMentorInfoHandler(mentorId)
    const mentorExpertiseList = [
        mentorInfo.primaryExpertise,
        mentorInfo.secondaryExpertise,
        mentorInfo.tertiaryExpertise,
    ]

    return (
        <>
            <Header />
            {mentorInfo && (
                <div className="p-6 md:p-16">
                    <Bio
                        avatar={mentorInfo.avatar}
                        name={mentorInfo.userName}
                        company={mentorInfo.company}
                        title={mentorInfo.title}
                        country={mentorInfo.country}
                        phoneNumber={mentorInfo.phoneNumber}
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
                                {mentorExpertiseList.length > 0 && (
                                    <BackgroundContent
                                        title={'Expertise'}
                                        content={mentorExpertiseList.map(
                                            (data, index) => (
                                                <>
                                                    {data && (
                                                        <BackgroundItem
                                                            key={index}
                                                            data={data!}
                                                        />
                                                    )}
                                                </>
                                            )
                                        )}
                                    />
                                )}
                                <Separator />
                                <BackgroundContent
                                    title={'Disciplines'}
                                    content={mentorInfo.mentorDisciplines.map(
                                        (data) => (
                                            <BackgroundItem
                                                key={data.id}
                                                data={data.discipline}
                                            />
                                        )
                                    )}
                                />
                                <Separator />
                                <BackgroundContent
                                    title={'Skills'}
                                    content={mentorInfo.mentorSkills.map(
                                        (data) => (
                                            <BackgroundItem
                                                key={data.id}
                                                data={data.skill}
                                            />
                                        )
                                    )}
                                />
                                <Separator />
                                <BackgroundContent
                                    title={'Tools'}
                                    content={mentorInfo.mentorTools.map(
                                        (data) => (
                                            <BackgroundItem
                                                key={data.id}
                                                data={data.tool}
                                            />
                                        )
                                    )}
                                />
                            </div>
                            {mentorInfo.experience.length > 0 && (
                                <Experience
                                    experiences={mentorInfo.experience}
                                />
                            )}

                            <Education
                                education={Number(mentorInfo.education)}
                            />
                        </div>
                        <div className="mt-6 px-6 lg:mt-0 lg:px-0">
                            {/* <Booking
                                mentorId={mentorId}
                                mentorInfo={mentorInfo}
                            /> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MentorProfile
