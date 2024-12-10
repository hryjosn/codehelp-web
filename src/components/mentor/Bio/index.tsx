import Image from 'next/image'

type Props = {
    avatar: string
    name: string
    company: string
    title: string
    country: string
}

const Bio = ({ avatar, name, company, title, country }: Props) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <div className="h-32 w-32 overflow-hidden rounded-full md:h-48 md:w-48">
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
                <h2 className="mb-1 text-2xl font-bold text-slate-800 md:text-4xl">
                    {name}
                    <span className="ml-1 text-lg md:text-2xl">{country}</span>
                </h2>
                <p className="text-base md:text-lg">
                    <span>{title}</span>
                    <span className="mx-1 text-gray-500">at</span>
                    <span>{company}</span>
                </p>
            </div>
        </div>
    )
}

export default Bio
