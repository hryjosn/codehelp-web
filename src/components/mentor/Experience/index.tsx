import type { Experience } from '~/container/MentorList/types'
import Image from 'next/image'

type ExperienceListProps = {
    experiences: Experience[]
}

const Experience = ({ experiences }: ExperienceListProps) => {
    return (
        <div className="p-6 rounded-xl border border-solid border-gray-200 text-slate-800">
            <div className="text-base font-bold mb-2">Experience</div>
            <ul>
                {experiences.map((experience, index) => (
                    <li
                        className="py-2 [&:not(:last-child)]:border-b border-solid border-gray-200"
                        key={index}
                    >
                        <div className="flex gap-2 mb-2">
                            <Image
                                src="/industry.svg"
                                alt="industry"
                                width="46"
                                height="46"
                            />
                            <div className="">
                                <p className="text-xl break-all">
                                    {experience.title}
                                </p>
                                <p className="text-sm">{experience.company}</p>
                            </div>
                        </div>
                        <p className="text-stone-500 text-sm">
                            {experience.description}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Experience
