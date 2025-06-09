import React from 'react'

type Props = {
    data: string
}

const BackgroundItem = ({ data }: Props) => {
    return (
        <div className="rounded-md border px-5 py-1 text-center text-sm font-black">
            {data}
        </div>
    )
}

export default BackgroundItem
