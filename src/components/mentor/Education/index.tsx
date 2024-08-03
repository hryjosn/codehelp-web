import type { Education } from '~/container/MentorList/types'
import Image from 'next/image'

type EducationProps = {
    education: Education
}

const Education = ({ education }: EducationProps) => {
    return (
        <div className="p-6 rounded-xl border border-solid border-gray-200 text-slate-800">
            <div className="text-base font-bold mb-2">Education</div>
            <div className="flex gap-2 mb-2">
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
