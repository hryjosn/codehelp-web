import type { Education } from '~/container/Home/components/MentorList/types'
import Image from 'next/image'
import { EDUCATION } from '~/container/UserProfile/MentorPage/types'

type EducationProps = {
    education: number
}

const Education = ({ education }: EducationProps) => {
    return (
        <div className="rounded-xl border border-solid border-gray-200 p-6 text-slate-800">
            <div className="mb-2 text-lg font-bold">Education</div>
            <div className="flex items-center">
                <Image
                    src="/education.svg"
                    alt="education"
                    width="46"
                    height="46"
                />
                <div className="ml-2">
                    <p className="text-lg">{EDUCATION[education]}</p>
                </div>
            </div>
        </div>
    )
}

export default Education
