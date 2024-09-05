'use client'
import { useRouter } from 'next/navigation'
import Booking from '~/components/Booking'
import Bio from '~/components/mentor/Bio'
import Education from '~/components/mentor/Education'
import Experience from '~/components/mentor/Experience'
import { useGetMentorInfo } from '../api/Mentor'

const MentorProfile = ({ params }: { params: { id: string } }) => {
    const { data, isSuccess, isLoading } = useGetMentorInfo(params.id)
    const router = useRouter()

    if (isLoading) {
        return <div>loading</div>
    }

    if (!isSuccess) {
        router.push('')
        return
    }

    return (
        <div className="p-6 md:p-16">
            <Bio
                avatar={'/MentorList/mentor_1.jpg'}
                name={data.mentor.userName}
                company={data.mentor.company}
                title={data.mentor.title}
            />
            <div className="mt-6 flex flex-col gap-6 border-t border-solid border-gray-200 pt-6 md:flex-row md:gap-32">
                <div className="flex flex-1 flex-col gap-4 p-6">
                    <p className="line-clamp-3">{data.mentor.introduction}</p>
                    <Experience
                        experiences={[
                            {
                                title: 'Lead Software Engineer, Successfactors, Cloud and SAP HCM/Benefits/Payroll/Time',
                                company: 'Marvel Technologies Inc',
                                description:
                                    'Costco Wholesale, EmployEZ, Seattle School District',
                            },
                        ]}
                    />
                    <Education
                        education={{
                            major: 'Computer Science',
                            degree: 'Engineer’s Degree',
                        }}
                    />
                </div>
                <Booking />
            </div>
        </div>
    )
}

export default MentorProfile
