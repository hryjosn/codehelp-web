import React from 'react'
import SkeletonCard from './components/SeletonCard/SkeletonCard'

const Loading = () => {
    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-1 flex-col justify-between">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Loading
