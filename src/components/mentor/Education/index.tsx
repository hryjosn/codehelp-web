import type { Education } from '~/container/Home/components/MentorList/types'
import Image from 'next/image'

type EducationProps = {
    educationProps: string
}

const Education = ({ educationProps }: EducationProps) => {
    const education = educationProps.split('$%$')
    return (
        <div className="rounded-xl border border-solid border-gray-200 p-6 text-slate-800">
            <div className="mb-2 text-lg font-bold">Education</div>
            <div className="mb-2 flex gap-2">
                <Image
                    src="/education.svg"
                    alt="education"
                    width="46"
                    height="46"
                />
                <div>
                    <p className="text-xl">{education[0]}</p>
                    <p className="text-base text-stone-500">{education[1]}</p>
                </div>
            </div>
        </div>
    )
}

export default Education
