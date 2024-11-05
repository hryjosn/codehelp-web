import type { Education } from '~/container/Home/components/MentorList/types'
import Image from 'next/image'

type EducationProps = {
    education: Education
}

const Education = ({ education }: EducationProps) => {
    return (
        <div className="rounded-xl border border-solid border-gray-200 p-6 text-slate-800">
            <div className="mb-2 text-base font-bold">Education</div>
            <div className="mb-2 flex gap-2">
                <Image
                    src="/education.svg"
                    alt="education"
                    width="46"
                    height="46"
                />
                <div>
                    <p className="text-xl">{education.major}</p>
                    <p className="text-base text-stone-500">
                        {education.degree}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Education
