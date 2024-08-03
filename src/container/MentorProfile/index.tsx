import Booking from '~/components/Booking'
import Bio from '~/components/mentor/Bio'
import Experience from '~/components/mentor/Experience'

const MentorProfile = () => {
    return (
        <div className="p-6 md:p-16">
            <Bio />
            <div className="mt-6 pt-6 flex flex-col gap-6 border-t border-solid border-gray-200 md:flex-row">
                <div className="p-2 flex flex-col gap-4 border-solid border border-sky-500 flex-1">
                    <p className="line-clamp-3">
                        Vamsi Yarlagadda possesses extensive expertise in development and solution design, backed by over 15 years of professional experience. He adeptly crafts technical solutions utilizing a diverse array of programming languages and technologies such as SAP, SuccessFactors, HR and cloud HR applications, C/C++, SQL, Python, and TOGAF (Enterprise Architecture). With a background in Computer Science and multiple certifications like SAP, SuccessFactors, TOGAF architect, proficiency certifications in Python, C, and C++, he is well-equipped to tackle complex challenges.
                    </p>
                </div>
                <Booking />
            </div>
        </div>
    )
}

export default MentorProfile
