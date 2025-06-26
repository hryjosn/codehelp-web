import Image from 'next/image'
import { HiPhone } from 'react-icons/hi2'

type Props = {
    avatar: string
    name: string
    company: string
    title: string
    country: string
    phoneNumber: string
}

const Bio = ({ avatar, name, company, title, country, phoneNumber }: Props) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row  md:gap-6 items-center">
            <div className="h-32 w-32 overflow-hidden rounded-full md:h-48 md:w-48">
                <Image
                    src={avatar}
                    alt={name}
                    width={0}
                    height={0}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div className='flex flex-col items-center md:block'>
                <h2 className="mb-1 text-2xl font-bold text-slate-800 md:text-4xl">
                    {name}
                    <span className="ml-1 text-lg md:text-2xl">{country}</span>
                </h2>
                <p className="text-base md:text-lg">
                    <span>{title}</span>
                    <span className="mx-1 text-gray-500">at</span>
                    <span>{company}</span>
                </p>
                <p className="mt-1 flex items-center text-sm">
                    <HiPhone className="cursor-pointer" size={15} />
                    {phoneNumber}
                </p>
            </div>
        </div>
    )
}

export default Bio
