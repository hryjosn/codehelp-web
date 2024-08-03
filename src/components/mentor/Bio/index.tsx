import Image from 'next/image'

type Props = {
    avatar: string
    name: string
    company: string
    title: string
}

const Bio = ({ avatar, name, company, title }: Props) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <div className="overflow-hidden w-32 h-32 rounded-full md:w-48 md:h-48">
                <Image
                    src={avatar}
                    alt={name}
                    width={0}
                    height={0}
                    sizes="100%"
                    style={{ width: 'auto', height: 'auto' }}
                />
            </div>
            <div>
                <h2 className="text-2xl text-slate-800 font-bold mb-1 md:text-4xl">
                    {name}
                </h2>
                <p className="text-base	md:text-lg">
                    <span>{title}</span>
                    <span className="mx-1 text-gray-500">at</span>
                    <span>{company}</span>
                </p>
            </div>
        </div>
    )
}

export default Bio
