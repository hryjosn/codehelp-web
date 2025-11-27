import React from 'react'

type Props = {
    data: string
}

const BackgroundItem = ({ data }: Props) => {
    return (
        <div className="flex items-center justify-center text-center rounded-md border px-5 py-1 text-xs md:text-sm font-black">
            {data}
        </div>
    )
}

export default BackgroundItem
