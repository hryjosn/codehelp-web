import type { Experience } from '~/container/Home/components/MentorList/types'
import Image from 'next/image'

type ExperienceListProps = {
    experiences: Experience[]
}

const Experience = ({ experiences }: ExperienceListProps) => {
    return (
        <div className="rounded-xl border border-solid border-gray-200 p-6 text-slate-800">
            <div className="mb-2 text-base font-bold">Experience</div>
            <ul>
                {experiences.map((experience, index) => (
                    <li
                        className="border-solid border-gray-200 py-2 [&:not(:last-child)]:border-b"
                        key={index}
                    >
                        <div className="mb-2 flex gap-2">
                            <Image
                                src="/industry.svg"
                                alt="industry"
                                width="46"
                                height="46"
                            />
                            <div>
                                <p className="break-all text-xl">
                                    {experience.title}
                                </p>
                                <p className="text-sm">{experience.company}</p>
                            </div>
                        </div>
                        <p className="text-sm text-stone-500">
                            {experience.description}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Experience
