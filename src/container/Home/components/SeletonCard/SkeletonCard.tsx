import React from 'react'

const SkeletonCard = () => {
    return (
        <div className="flex h-full animate-pulse cursor-pointer flex-col rounded-2xl border border-solid border-stone-200 p-2">
            <div className="mb-2 h-64 w-full overflow-hidden rounded-xl bg-gray-200"></div>

            <div className="mb-4 flex flex-col gap-2 text-slate-800">
                <div className="flex gap-1">
                    <div className="h-5 w-24 rounded bg-gray-200"></div>
                    <div className="h-5 w-12 rounded bg-gray-200"></div>
                </div>
                <div className="h-4 w-40 rounded bg-gray-200"></div>
                <div className="h-4 w-28 rounded bg-gray-200"></div>
            </div>

            <div className="mt-auto flex justify-between rounded-lg bg-zinc-50 p-3 text-xs text-stone-500">
                <div>
                    <div className="h-3 w-24 rounded bg-gray-200"></div>
                    <div className="mt-1 h-5 w-12 rounded bg-gray-200"></div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonCard
