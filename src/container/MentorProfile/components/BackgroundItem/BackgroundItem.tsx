import Image from 'next/image'
import React from 'react'

type Props = {
    title: string
    content: string[]
}

const BackgroundItem = ({ title, content }: Props) => {
    return (
        <div className="flex items-stretch justify-between gap-4 border-b border-gray-200 py-5">
            <span className="self-center font-bold text-gray-500">{title}</span>
            <div className="flex gap-3">
                {content.map((data, index) => {
                    if (data === '') return
                    return (
                        <div
                            key={index}
                            className="cursor-pointer rounded-md border px-5 py-1 text-sm font-black"
                        >
                            {data}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export { BackgroundItem }
