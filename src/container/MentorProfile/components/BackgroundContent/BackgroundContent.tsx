import React from 'react'

type Props = {
    title: string
    content: React.ReactNode
}

const BackgroundContent = ({ title, content }: Props) => {
    return (
        <div className="items-stretch justify-between gap-4 py-5">
            <span className="self-center font-bold text-gray-500">{title}</span>
            <div className="mt-4 flex grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-2 lg:gap-2 xl:grid-cols-4 xl:gap-4">
                {content}
            </div>
        </div>
    )
}

export default BackgroundContent
