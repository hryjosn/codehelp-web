import Image from 'next/image'

const Bio = () => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <div className="overflow-hidden w-32 rounded-full md:w-48">
                <Image
                    src={'/MentorList/mentor_1.jpg'}
                    alt={'name'}
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
            <div>
                <h2 className="text-2xl text-slate-800 font-bold mb-1 md:text-4xl">
                    Vamsi Yarlagadda
                </h2>
                <p className="text-base	md:text-lg">
                    HCM/Payroll Solutions Architect
                    <span className="mx-1 text-gray-500">at</span>
                    Seattle school district
                </p>
            </div>
        </div>
    )
}

export default Bio
